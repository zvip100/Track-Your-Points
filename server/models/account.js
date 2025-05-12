import { desc } from "drizzle-orm";
import { db, users, points, bookings, eq, sql } from "../database/db";
import { sendEmail } from "../email/email";
import bookingReqEmail from "../email/templates/booking-req-email";
import { formatDate } from "../middlewares";

export async function getUser(id) {
  try {
    const result = await db
      .select({
        id: users.id,
        firstName: users.first_name,
        lastName: users.last_name,
        email: users.email,
        points: sql`COALESCE(SUM(${points.amount}), 0)`,
        bookingStatus: bookings.status,
      })
      .from(users)
      .leftJoin(points, eq(users.id, points.user))
      .leftJoin(bookings, eq(users.id, bookings.user))
      .where(eq(users.id, id))
      .groupBy(
        users.id,
        users.first_name,
        users.last_name,
        users.email,
        bookings.status
      );

    console.log("Getting user info by token result: ", result);

    if (result.length === 0) {
      return "User not found";
    }

    return result;
  } catch (e) {
    console.error("Error getting user info by token from DB: ", e);
    throw e;
  }
}

export async function getPoints(user) {
  try {
    const result = await db
      .select({
        id: points.id,
        email: users.email,
        amount: points.amount,
        totalPoints: sql`(SELECT SUM(${points.amount}) FROM ${points} WHERE ${points.user} = ${user})`,
        date: sql`to_char(${points.added_at}, 'MM/DD/YYYY')`,
        time: sql`to_char(${points.added_at}, 'HH12:MI:SS AM')`,
      })
      .from(points)
      .leftJoin(users, eq(points.user, users.id))
      .where(eq(points.user, user))
      .orderBy(desc(points.added_at));

    console.log("Get user points history from DB: ", result);

    return result;
  } catch (e) {
    console.error("Error getting user points history from DB: ", e.message);
    throw e;
  }
}

export async function getTotalPoints(user) {
  try {
    const result = await db
      .select({
        totalPoints: sql`COALESCE(SUM(${points.amount}), 0)`,
      })
      .from(points)
      .where(eq(points.user, user));

    console.log("Get user points-total from DB: ", result);

    return result[0];
  } catch (e) {
    console.error("Error getting user points-total from DB", e.message);
    throw e;
  }
}

export async function requestBooking(user, checkIn, checkOut) {
  try {
    const result = await db
      .select({
        id: users.id,
        name: sql`CONCAT(${users.first_name}, ' ', ${users.last_name})`,
        email: users.email,
        totalPoints: sql`(SELECT COALESCE(SUM(${points.amount}), 0) FROM ${points} WHERE ${points.user} = ${user})`,
      })
      .from(users)
      .where(eq(users.id, user));

    console.log("Request-booking result from DB: ", result);

    if (result.length === 0) return "User not found";

    if (result[0]?.totalPoints < 90000) return "Not enough points";

    const { subject, content } = bookingReqEmail(
      result[0]?.name,
      result[0]?.email,
      formatDate(checkIn),
      formatDate(checkOut)
    );

    const sendMail = await sendEmail("hershypod@outlook.com", subject, content);

    if (sendMail) {
      console.log("Succesfully sent email to Wave-Tampa.");
      // return "Succesfully sent email";
    } else {
      console.error("Error sending email to Wave-Tmapa.");
      throw new Error("Failed to send email");
    }

    const addBooking = await db
      .insert(bookings)
      .values({
        user,
        checkIn,
        checkOut,
      })
      .returning({
        id: bookings.id,
        checkIn: bookings.checkIn,
        checkOut: bookings.checkOut,
        status: bookings.status,
        date: sql`to_char(${bookings.created_at}, 'MM/DD/YYYY')`,
        time: sql`to_char(${bookings.created_at}, 'HH12:MI:SS AM')`,
      });

    if (addBooking.length === 0) throw new Error("Failed to add booking");

    return addBooking[0];
  } catch (e) {
    console.error("Error requesting-booking result from DB: ", e.message);
    throw e;
  }
}

export async function getBooking(user) {
  try {
    const result = await db
      .select({
        id: bookings.id,
        checkIn: bookings.checkIn,
        checkOut: bookings.checkOut,
        status: bookings.status,
        date: sql`to_char(${bookings.created_at}, 'MM/DD/YYYY')`,
        time: sql`to_char(${bookings.created_at}, 'HH12:MI:SS AM')`,
      })
      .from(bookings)
      .where(eq(bookings.user, user));

    console.log("Get booking from DB: ", result);

    if (result.length === 0) return "No booking";

    return result[0];
  } catch (e) {
    console.error("Error getting booking from DB: ", e.message);
    throw e;
  }
}

import { asc, desc } from "drizzle-orm";
import { db, users, admin, points, bookings, eq, sql } from "../database/db";

export async function getAccount(id) {
  try {
    const result = await db
      .select({
        id: admin.id,
        email: admin.email,
        dateCreated: sql`to_char(${admin.created_at}, 'MM/DD/YYYY')`,
        timeCreated: sql`to_char(${admin.created_at}, 'HH12:MI:SS AM')`,
      })
      .from(admin)
      .where(eq(admin.id, id));

    console.log("Getting admin account from DB result: ", result);

    if (result.length === 0) {
      return "Not found";
    }

    return result;
  } catch (e) {
    console.error("Error getting admin account: ", e.message);
    throw e;
  }
}

export async function getUsers() {
  try {
    const allUsers = await db
      .select({
        id: users.id,
        firstName: users.first_name,
        lastName: users.last_name,
        email: users.email,
        points: sql`COALESCE(SUM(${points.amount}), 0)`,
        registered: users.registered,
      })
      .from(users)
      .leftJoin(points, eq(users.id, points.user))
      .groupBy(
        users.id,
        users.first_name,
        users.last_name,
        users.email,
        users.registered
      )
      .orderBy(asc(users.last_name));

    console.log("Users: ", allUsers);

    allUsers.forEach((user) => {
      if (user.registered === true) user.status = "Registered";
      else user.status = "Invited";
    });

    return allUsers;
  } catch (e) {
    console.error("Error getting users: ", e.message);
    throw e;
  }
}

export async function addUsers(usersArray) {
  try {
    const newUsers = await db
      .insert(users)
      .values(
        usersArray.map((user) => ({
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          registered: false,
        }))
      )
      .returning({ email: users.email })
      .execute();
    console.log("New User: ", newUsers);
    return newUsers;
  } catch (e) {
    console.error("Error adding user: ", e.message);
    throw e;
  }
}

export async function addPoints(user, points_) {
  try {
    const result = await db
      .insert(points)
      .values({ user: user, amount: points_ })
      .returning();

    console.log("Add points result: ", result);
    return result;
  } catch (e) {
    console.error("Error adding points: ", e.message);
    throw e;
  }
}

export async function getPoints() {
  try {
    const result = await db
      .select({
        id: points.id,
        userId: points.user,
        firstName: users.first_name,
        lastName: users.last_name,
        email: users.email,
        amount: points.amount,
        date: sql`to_char(${points.added_at}, 'MM/DD/YYYY')`,
        time: sql`to_char(${points.added_at}, 'HH12:MI:SS AM')`,
      })
      .from(points)
      .leftJoin(users, eq(points.user, users.id))
      .orderBy(desc(points.added_at));

    console.log("Get points result: ", result);
    return result;
  } catch (e) {
    console.error("Error getting points history from DB: ", e.message);
    throw e;
  }
}

export async function removePoints(user, points_) {
  try {
    const result = await db
      .insert(points)
      .values({ user: user, amount: points_ })
      .returning();

    console.log("Remove points DB result: ", result);
    return result;
  } catch (e) {
    console.error("Error removing points from DB: ", e.message);
    throw e;
  }
}

export async function confirmBooking(user) {
  try {
    await db.transaction(async (tx) => {
      const bookingResult = await tx
        .update(bookings)
        .set({
          confirmed: true,
          updated_at: sql`TIMEZONE('America/New_York', NOW())`,
        })
        .where(eq(bookings.user, user))
        .returning({
          confirmed: bookings.confirmed,
          date: sql`to_char(${bookings.updated_at}, 'MM/DD/YYYY')`,
          time: sql`to_char(${bookings.updated_at}, 'HH12:MI:SS AM')`,
        });

      const pointsResult = await tx
        .insert(points)
        .values({ user: user, amount: -90000 })
        .returning();

      if (bookingResult.length === 0 || pointsResult.length === 0) {
        tx.rollback();
      }
    });

    return { success: true };
  } catch (e) {
    console.error("Error confirming booking from DB: ", e.message);
    throw e;
  }
}

export async function getBookings() {
  try {
    const result = await db
      .select({
        id: bookings.id,
        user: bookings.user,
        checkIn: bookings.checkIn,
        checkOut: bookings.checkOut,
        confirmed: bookings.confirmed,
        requestedOn: sql`to_char(${bookings.created_at}, 'MM/DD/YYYY HH12:MI:SS AM')`,
        confirmedOn: sql`to_char(${bookings.updated_at}, 'MM/DD/YYYY HH12:MI:SS AM')`,
        name: sql`CONCAT(${users.first_name}, ' ', ${users.last_name})`,
        email: users.email,
      })
      .from(bookings)
      .leftJoin(users, eq(bookings.user, users.id))
      .orderBy(desc(bookings.created_at));

    console.log("Get bookings DB result: ", result);
    return result;
  } catch (e) {
    console.error("Error getting bookings from DB: ", e.message);
    throw e;
  }
}

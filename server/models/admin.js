import { db, users, points, eq, sql } from "../database/db";

export async function getUsers() {
  try {
    const allUsers = await db
      .select({
        id: users.id,
        firstName: users.first_name,
        lastName: users.last_name,
        email: users.email,
        points: users.points,
        registered: users.registered,
      })
      .from(users);
    console.log("Users: ", allUsers);

    allUsers.forEach((user) => {
      if (user.registered === true) user.status = "Registered";
      else user.status = "Invited";
    });

    return allUsers;
  } catch (e) {
    console.error("Error getting users: ", e.message);
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
    const currentPoints = await db
      .select({ points: users.points })
      .from(users)
      .where(eq(users.id, user));

    console.log("current points: ", currentPoints);

    const newPoints = currentPoints[0].points + points_;
    console.log("new points: ", newPoints);

    const result = await db
      .update(users)
      .set({ points: newPoints })
      .where(eq(users.id, user))
      .returning({ user: users.email, points: users.points });

    const addRecord = await db
      .insert(points)
      .values({ user: user, amount: points_ })
      .returning();

    console.log("New points record: ", addRecord);

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
        email: users.email,
        amount: points.amount,
        date: sql`to_char(${points.added_at}, 'MM/DD/YYYY')`,
        time: sql`to_char(${points.added_at}, 'HH12:MI:SS AM')`,
      })
      .from(points)
      .leftJoin(users, eq(points.user, users.id));

    console.log("Get points result: ", result);
    return result;
  } catch (e) {
    console.error("Error getting points history from DB: ", e.message);
    throw e;
  }
}

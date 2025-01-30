import { db, users, eq } from "../database/db";

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

export async function addPoints(user, points) {
  try {
    const currentPoints = await db
      .select({ points: users.points })
      .from(users)
      .where(eq(users.email, user));

    console.log("current points: ", currentPoints);

    const newPoints = currentPoints[0].points + points;
    console.log("new points: ", newPoints);

    const result = await db
      .update(users)
      .set({ points: newPoints })
      .where(eq(users.email, user))
      .returning({ user: users.email, points: users.points });
    return result;
  } catch (e) {
    console.error("Error adding points: ", e.message);
    throw e;
  }
}

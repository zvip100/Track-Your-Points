import { db, users } from "../database/db";

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
      if (user.registered === true) user.registered = "Yes";
      else user.registered = "No";
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

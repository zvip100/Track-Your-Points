import { useState } from "react";
import AdminActions from "./admin-actions";

function UserTable({ users, setReloadPage }) {
  const [user, setUser] = useState("");

  return (
    <>
      <div className="user-table">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Status</th>
                <th scope="col">Total Points</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index} onClick={() => setUser(user.email)}>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td>{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {user && (
        <AdminActions
          user={user}
          setUser={() => setUser("")}
          setReloadPage={setReloadPage}
        />
      )}
    </>
  );
}

export default UserTable;

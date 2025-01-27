import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserTable from "./user-table";
import BackButton from "./back-btn";
import LoadingSpinner from "./loading";
import "../styles/admin.css";

function Admin() {
  const [users, setUsers] = useState();
  const [pending, setPending] = useState(false);
  //const navigate = useNavigate();

  async function getUsers() {
    if (users) {
      setUsers();
      return;
    }
    setPending(true);

    try {
      const response = await fetch("http://localhost:3000/admin/get-users", {
        method: "GET",
      });

      const result = await response.json();
      console.log(result);

      setUsers(result);

      /* const keys = Object.keys(result[0]);
      keys.shift();
      console.log(keys);*/
    } catch (e) {
      console.error("Error getting users: ", e.message);
    }
    setPending(false);
  }
  return (
    <div className="admin-container">
      <h1 className="title">Admin Page!</h1>

      <div className="button-group">
        <Link to="/admin/upload-users">
          <button type="button">Upload User Excel Sheet</button>
        </Link>{" "}
        <Link to="/admin/add-user">
          <button type="button">Add User</button>
        </Link>{" "}
        <button type="button" onClick={getUsers}>
          {pending ? "Loading..." : !users ? "See All Users" : "Dismiss"}
        </button>
      </div>

      {users && <UserTable users={users} />}

      {pending && <LoadingSpinner />}

      <BackButton />
    </div>
  );
}

export default Admin;

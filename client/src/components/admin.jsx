import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "./App";
import BackButton from "./back-btn";
import Footer from "./footer";
import "../styles/admin.css";

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const admin = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) navigate("/admin/login");
  }, []);

  return (
    <>
      <div className="admin-container">
        <h1 className="title">Admin Page!</h1>

        <div className="button-group">
          <Link to="/admin/upload-users">
            <button type="button">Upload User Excel Sheet</button>
          </Link>{" "}
          <Link to="/admin/add-user">
            <button type="button">Add User</button>
          </Link>{" "}
          <Link to="/admin/all-users">
            <button type="button">See All Users</button>
          </Link>{" "}
          <Link to="/admin/points-history">
            <button type="button">Points History</button>
          </Link>{" "}
        </div>
      </div>

      <BackButton path="/" text="Back to Homepage" />
      <Footer />
    </>
  );
}

export default Admin;

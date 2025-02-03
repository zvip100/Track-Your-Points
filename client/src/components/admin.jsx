import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserTable from "./user-table";
import Popup from "./popup";
import BackButton from "./back-btn";
import Footer from "./footer";
import LoadingSpinner from "./loading";
import "../styles/admin.css";

function Admin() {
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

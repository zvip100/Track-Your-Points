import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoGrid, IoPersonAdd, IoPeople, IoStatsChart } from "react-icons/io5";
import AdminSidebar from "./admin-sidebar";
import { AdminContext } from "./App";
import BackButton from "./back-btn";
import Footer from "./footer";
import { scrollToTop, changeTitle } from "../helpers/utils";
import "../styles/admin.css";

function Admin({ title }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const admin = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
    changeTitle(title);

    if (!admin) navigate("/admin/login");
  }, []);

  return (
    <>
      <AdminSidebar />
      <h1 className="title">Admin Page!</h1>

      <div className="admin-container">
        <div className="button-group">
          <Link to="/admin/upload-users" className="admin-page-btn">
            <IoGrid size={24} />
            <span>Upload Users</span>
          </Link>{" "}
          <Link to="/admin/add-user" className="admin-page-btn">
            <IoPersonAdd size={24} />
            <span>Add User</span>
          </Link>{" "}
          <Link to="/admin/all-users" className="admin-page-btn">
            <IoPeople size={24} />
            <span>All Users</span>
          </Link>{" "}
          <Link to="/admin/points-history" className="admin-page-btn">
            <IoStatsChart size={24} />
            <span>Points History</span>
          </Link>
        </div>
      </div>

      <BackButton path="/" text="Back to Homepage" />
      <Footer />
    </>
  );
}

export default Admin;

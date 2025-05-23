import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/is-mobile";
import {
  IoCloudUpload,
  IoPersonAdd,
  IoPeople,
  IoStatsChart,
  IoCalendar,
} from "react-icons/io5";
import AdminSidebar from "./admin-sidebar";
import { AdminContext } from "./App";
import BackButton from "./back-btn";
import Footer from "./footer";
import { scrollToTop, changeTitle } from "../helpers/utils";
import "../styles/admin.css";

export function AdminHeader({ setAdminInfo, path, text }) {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? "admin-header" : ""}>
      <AdminSidebar setAdminInfo={setAdminInfo} />
      <BackButton path={path} text={text} />
    </div>
  );
}

function Admin({ setAdminInfo, title }) {
  const admin = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
    changeTitle(title);
  }, []);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("admin-token");
    if (!admin && !adminToken) navigate("/admin/login");
  }, [admin]);

  return (
    <>
      <AdminHeader setAdminInfo={setAdminInfo} path="/" text="Homepage" />

      <h1 className="title">~Admin Dashboard~</h1>

      <div className="admin-container">
        <div className="button-group">
          <Link to="/admin/upload-users" className="admin-page-btn">
            <IoCloudUpload size={24} />
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
          </Link>{" "}
          <Link to="/admin/all-bookings" className="admin-page-btn">
            <IoCalendar size={24} />
            <span>All Bookings</span>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Admin;

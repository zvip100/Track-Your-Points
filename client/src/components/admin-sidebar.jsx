import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  IoCloudUpload,
  IoPersonAdd,
  IoPeople,
  IoStatsChart,
  IoLogOut,
  IoMenu,
  IoClose,
  IoCalendar,
} from "react-icons/io5";
import { useIsMobile } from "../hooks/is-mobile";
import "../styles/admin-sidebar.css";

function AdminSidebar({ setAdminInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 20 : 24;

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".admin-sidebar");
      const toggleButton = document.querySelector(".sidebar-toggle");

      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleLogout() {
    sessionStorage.removeItem("admin-token");
    setAdminInfo(null);
  }

  return (
    <>
      <button
        className={classNames(
          "sidebar-toggle",
          isOpen && "is-open",
          isMobile && "mobile"
        )}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={iconSize} /> : <IoMenu size={iconSize} />}
      </button>

      <aside className={classNames("admin-sidebar", isOpen && "open")}>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <Link to="/admin/upload-users" className="nav-item">
              <IoCloudUpload size={24} />
              <span>Upload Users</span>
            </Link>
            <Link to="/admin/add-user" className="nav-item">
              <IoPersonAdd size={24} />
              <span>Add User</span>
            </Link>
            <Link to="/admin/all-users" className="nav-item">
              <IoPeople size={24} />
              <span>All Users</span>
            </Link>
            <Link to="/admin/points-history" className="nav-item">
              <IoStatsChart size={24} />
              <span>Points History</span>
            </Link>
            <Link to="/admin/all-bookings" className="nav-item">
              <IoCalendar size={24} />
              <span>All Bookings</span>
            </Link>
          </nav>
          <button onClick={handleLogout} className="nav-item logout">
            <IoLogOut size={24} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;

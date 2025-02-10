import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoGrid,
  IoPersonAdd,
  IoPeople,
  IoStatsChart,
  IoLogOut,
  IoMenu,
} from "react-icons/io5";
import "../styles/admin-sidebar.css";

function AdminSidebar({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <IoMenu size={24} />
      </button>

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <Link to="/admin/upload-users" className="nav-item">
              <IoGrid size={24} />
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

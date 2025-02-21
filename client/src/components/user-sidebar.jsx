import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoLogOut, IoMenu, IoHome, IoClose } from "react-icons/io5";
import "../styles/admin-sidebar.css";

function UserSidebar({ setUserInfo, bookingInfo }) {
  const [isOpen, setIsOpen] = useState(false);

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
    sessionStorage.removeItem("token");
    setUserInfo(null);
  }

  return (
    <>
      <button
        className={`sidebar-toggle ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <nav className="sidebar-nav"></nav>
          <Link to="/book-villa" className="nav-item">
            <IoHome size={24} />
            <span>{bookingInfo ? "My booking" : "Book Villa"}</span>
          </Link>
          <button onClick={handleLogout} className="nav-item logout">
            <IoLogOut size={24} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default UserSidebar;

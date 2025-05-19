import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import starlifeLogo from "../assets/starlife-logo.jpg";
import {
  IoHomeOutline,
  IoPersonCircleOutline,
  IoShieldCheckmarkOutline,
  IoLogInOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import "../styles/desktop-nav.css";

function DesktopNav({ isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <nav className="desktop-nav">
      <div className="desktop-site-logo">
        <Link to="/" reloadDocument>
          <img src={logo} alt="Website logo" />
        </Link>
      </div>

      <div className="nav-btn-group">
        <button type="button" onClick={() => navigate("/our-villa")}>
          <IoHomeOutline size={20} />
          <span>Our Villa</span>
        </button>{" "}
        {isLoggedIn ? (
          <button type="button" onClick={() => navigate("/my-account")}>
            <IoPersonCircleOutline size={20} />
            <span>My Account</span>
          </button>
        ) : (
          <>
            <button type="button" onClick={() => navigate("/login")}>
              <IoLogInOutline size={20} />
              <span>Log In</span>
            </button>{" "}
            <button type="button" onClick={() => navigate("/sign-up")}>
              <IoPersonAddOutline size={20} />
              <span>Sign Up</span>
            </button>{" "}
          </>
        )}
        <button type="button" onClick={() => navigate("/admin")}>
          <IoShieldCheckmarkOutline size={20} />
          <span>Admin</span>
        </button>
      </div>
    </nav>
  );
}

export default DesktopNav;

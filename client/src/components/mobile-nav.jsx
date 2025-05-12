import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoHomeOutline,
  IoPersonCircleOutline,
  IoShieldCheckmarkOutline,
  IoLogInOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import logo from "../assets/logo.svg";
import "../styles/mobile-nav.css";

function MobileNav({ isLoggedIn }) {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/my-account");
    } else {
      setShowAuthPopup(!showAuthPopup);
    }
  };

  return (
    <nav className="mobile-nav">
      <div className="mobile-site-logo">
        <a href="https://www.starlifevacation.com/" target="_blank">
          <img src={logo} alt="Website logo" />
        </a>
      </div>
      <div className="nav-actions">
        <button onClick={() => navigate("/our-villa")} className="nav-icon">
          <IoHomeOutline size={24} />
        </button>

        <div
          className="auth-container"
          onClick={() => showAuthPopup && setShowAuthPopup(false)}
        >
          <button onClick={handleClick} className="nav-icon">
            <IoPersonCircleOutline size={24} />
          </button>

          {!isLoggedIn && showAuthPopup && (
            <div className="auth-popup">
              <button onClick={() => navigate("/login")} className="auth-btn">
                <IoLogInOutline size={20} />
                Log In
              </button>
              <button onClick={() => navigate("/sign-up")} className="auth-btn">
                <IoPersonAddOutline size={20} />
                Sign Up
              </button>
            </div>
          )}
        </div>

        <button onClick={() => navigate("/admin")} className="nav-icon">
          <IoShieldCheckmarkOutline size={24} />
        </button>
      </div>
    </nav>
  );
}

export default MobileNav;

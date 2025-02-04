import "../styles/footer.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Track your vacation points with ease</p>
          <p>Stay connected with StarLife Vacation</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/about">How It Works</Link>
            </li>
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <a
                href="https://www.starlifevacation.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Main Website
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>
            Email:{" "}
            <a href="mailto:hershypod@gmail.com">info@starlifevacation.com</a>
          </p>
          <p>Phone: (800) 000-0000</p>
        </div>
      </div>

      <div className="footer-bottom">
        <img src={logo} alt="StarLife Logo" className="footer-logo" />
        <p>&copy; 2025 StarLife Vacation. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

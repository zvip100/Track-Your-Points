import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { scrollToTop, changeTitle } from "../helpers/utils";
import BackButton from "./back-btn";
import Footer from "./footer";
import "../styles/About.css";

function About({ title }) {
  useEffect(() => {
    scrollToTop();
    changeTitle(title);
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className="about-container">
        <h1 className="title">About StarLife Points</h1>

        <div className="about-content">
          <section className="about-section">
            <h2>Welcome to StarLife Points Tracker</h2>
            <p>
              StarLife Points is a dedicated platform designed to help our
              valued customers track and manage their earned points from
              StarLife Vacation deals. Our system provides a transparent and
              efficient way to monitor your rewards.
            </p>
          </section>

          <section className="about-section">
            <h2>How It Works</h2>
            <ul>
              <li>Register your account with your StarLife email</li>
              <li>Log in to view your current points balance</li>
              <li>Track points history from all your transactions</li>
              <li>Watch your rewards grow with each new deal</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Features</h2>
            <ul>
              <li>Real-time points tracking</li>
              <li>Detailed transaction history</li>
              <li>Secure account management</li>
              <li>User-friendly dashboard</li>
              <li>Email notifications for points updates</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Contact Support</h2>
            <p>
              Need help? Our team is here to assist you with any questions about
              your points or account. Contact us at support@starlifevacation.com
            </p>
          </section>
        </div>
      </div>
      <BackButton />
      <Footer />
    </>
  );
}

export default About;

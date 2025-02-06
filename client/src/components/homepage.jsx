import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./App";
import logo from "../assets/logo.svg";
import villaImg from "../assets/villa.jpg";
import VillaPool from "../assets/villa-pool.jpg";
import Footer from "./footer";
import { scrollToTop, changeTitle, formatNumber } from "../helpers/utils.js";
import "../styles/App.css";

function Homepage({ title }) {
  const [points, setPoints] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useContext(UserContext);

  useEffect(() => {
    scrollToTop();
    changeTitle(title);

    if (userInfo && location?.state === "login page") {
      console.log("user info: ", userInfo);
    }
  }, []);

  return (
    <>
      <div className="nav">
        <div className="nav-logo">
          <a href="https://www.starlifevacation.com/" target="_blank">
            <img src={logo} alt="Website logo" />
          </a>
        </div>

        <div className="nav-btn-group">
          <a href="https://www.starlifevacation.com/" target="_blank">
            <button type="button">Gallery</button>
          </a>{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Log In
          </button>{" "}
          <button type="button" onClick={() => navigate("/sign-up")}>
            Sign Up
          </button>{" "}
          {userInfo && (
            <button type="button" onClick={() => navigate("/my-account")}>
              My Account
            </button>
          )}{" "}
          <button type="button" onClick={() => navigate("/admin")}>
            Admin
          </button>
        </div>
      </div>

      <main className="main-content">
        <div className="centered-content">
          <div className="background-img"></div>

          <div>
            {userInfo && (
              <>
                {userInfo?.points > 0 ? (
                  <h3>
                    You already earned {formatNumber(userInfo?.points)} points!
                    Keep it up!
                  </h3>
                ) : (
                  <h3>You don't have any points yet. Start earning today!</h3>
                )}
                <Link to="/my-account">Click here for more info</Link>{" "}
              </>
            )}

            <h1>
              Earn 90,000 points to get your 3 nights dream vacation at our
              beautiful villa in Tampa Florida for free!
            </h1>

            <div>
              <Link to="/about">How it Works</Link>{" "}
            </div>

            <div className="img-container">
              <img
                src={villaImg}
                alt="Image of our villa in Tampa Florida"
                title="Front of our villa"
              ></img>
              <img
                src={VillaPool}
                alt="Image of the pool at our villa"
                title="Back of our villa"
              ></img>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Homepage;

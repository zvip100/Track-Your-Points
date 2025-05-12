import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";
import DesktopNav from "./desktop-nav.jsx";
import MobileNav from "./mobile-nav.jsx";
import villaImg from "../assets/villa.jpg";
import VillaPool from "../assets/villa-pool.jpg";
import livingRoom from "../assets/living-room.jpg";
import kitchen from "../assets/kitchen.jpg";
import Video from "./video";
import Footer from "./footer";
import {
  scrollToTop,
  changeTitle,
  formatNumber,
  formatBookingStatus,
} from "../helpers/utils.js";
import { useIsMobile } from "../hooks/is-mobile.js";
import "../styles/App.css";

function Homepage({ title }) {
  const [loggedIn, setLoggedIn] = useState(true);
  const isMobile = useIsMobile();
  const userInfo = useContext(UserContext);

  useEffect(() => {
    scrollToTop();
    changeTitle(title);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!userInfo && !token) {
      setLoggedIn(false);
    }
  }, [userInfo]);

  return (
    <>
      <header>
        {isMobile ? (
          <MobileNav isLoggedIn={loggedIn} />
        ) : (
          <DesktopNav isLoggedIn={loggedIn} />
        )}
      </header>

      <main className="main-content">
        <div className="centered-content">
          <div className="background-img" />

          <div>
            {userInfo && (
              <>
                {userInfo?.bookingStatus ? (
                  <h3>
                    Your booking is{" "}
                    {formatBookingStatus(userInfo.bookingStatus)}!{" "}
                  </h3>
                ) : userInfo?.points > 0 ? (
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
              Earn 90,000 Points To Get Your 3 Nights Dream Vacation At Our
              Beautiful Villa In Tampa Florida For Free!
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
              <img
                src={livingRoom}
                alt="Image of the living room at our villa"
                title="Our living room"
              ></img>
              <img
                src={kitchen}
                alt="Image of the kitchen at our villa"
                title="Our kitchen"
              ></img>
            </div>
            <Video />
            <Link to="/our-villa">Meet Our Villa</Link>{" "}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Homepage;

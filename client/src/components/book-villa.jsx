import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyBooking from "./my-booking";
import Popup from "./popup";
import LoadingSpinner from "./loading";
import BackButton from "./back-btn";
import Footer from "./footer";
import { getBookingInfo } from "../helpers/my-account";
import { changeTitle, scrollToTop, formatNumber } from "../helpers/utils";
import { UserContext } from "./App";
import { getTotalPoints, requestBooking } from "../helpers/book-villa";
import "../styles/book-villa.css";

function BookVilla({ title }) {
  const [pending, setPending] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [allowBooking, setAllowBooking] = useState(false);
  const [bookingInfo, setBookingInfo] = useState("");
  const [points, setPoints] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [msgType, setMsgType] = useState(false);
  const navigate = useNavigate();
  const userInfo = useContext(UserContext);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => scrollToTop(), changeTitle(title), []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!userInfo && !token) {
      navigate("/login", { state: "/book-villa" });
    } else {
      if (token) {
        const requestBookingInfo = async () => {
          setPending(true);
          const result = await getBookingInfo(token);
          //setPending(false);

          if (result?.error || result === "No booking") return false;

          setBookingInfo(result);
          return true;
        };

        const requestTotalPoints = async () => {
          //setPending(true);
          const result = await getTotalPoints(token);
          setPending(false);

          if (result?.error) {
            setShowPopup(true);
            setPopupMsg("Sorry, we couldn't load the page. Please try again.");
            setMsgType("error-msg");
            return;
          }

          setPoints(result?.totalPoints);
        };

        const hasBooking = requestBookingInfo();

        if (hasBooking !== true) {
          requestTotalPoints();
          return;
        }
        setPending(false);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (points >= 90000) setAllowBooking(true);
  }, [points]);

  const getMinCheckout = () => {
    if (!checkIn) return today;
    const nextDay = new Date(checkIn);
    nextDay.setDate(nextDay.getDate() + 3);
    return nextDay.toISOString().split("T")[0];
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!checkIn || !checkOut) return;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const today = new Date();

    console.log("Check in:", checkInDate);
    console.log("Check out:", checkOutDate);

    setCheckIn("");
    setCheckOut("");

    if (checkOutDate < checkInDate) {
      setShowPopup(true);
      setPopupMsg("Check-out date cannot be before check-in date!");
      setMsgType("error-msg");
      return;
    }

    if (checkInDate < today) {
      setShowPopup(true);
      setPopupMsg("Check-in date cannot be in the past!");
      setMsgType("error-msg");
      return;
    }

    if (diffDays < 1) {
      setShowPopup(true);
      setPopupMsg("Check out date cannot be the same date as check in!");
      setMsgType("error-msg");
      return;
    }

    if (diffDays !== 3) {
      setShowPopup(true);
      setPopupMsg("Please select 3 days only!");
      setMsgType("error-msg");
      return;
    }

    console.log(`Check in: ${checkIn}, Check out: ${checkOut}`);

    const token = sessionStorage.getItem("token");

    setPending(true);
    const request = await requestBooking(token, checkIn, checkOut);
    setPending(false);
    setShowPopup(true);

    if (request?.error) {
      setPopupMsg("Failed to request your booking. Please try again.");
      setMsgType("error-msg");
      return;
    }

    setBookingInfo(request);

    setPopupMsg(
      "Successfully submitted your booking request. Await an update soon via Email."
    );
    setMsgType("success-msg");
  }

  return (
    <>
      <div className="account-container">
        <>
          {bookingInfo ? (
            <MyBooking bookingInfo={bookingInfo} />
          ) : (
            <>
              {points ? (
                <>
                  {allowBooking ? (
                    <>
                      <h1 className="welcome-title">~Book Your Stay~</h1>

                      <p className="info-text">
                        <a
                          href="https://www.wavetampa.com/book-a-room/rooms/d27e8491-c95e-4898-871d-0ed46be0abd9"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click here
                        </a>{" "}
                        to check available dates, scroll down a little bit to
                        see our villa (Fountainview Villa), Then finish your
                        booking request here using your points.
                      </p>
                      <p className="instruction">
                        &#183; Please select 3 days &#183;
                      </p>

                      <form className="booking-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="check-in">Check In</label>
                          <input
                            type="date"
                            id="check-in"
                            name="check-in"
                            min={today}
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="check-out">Check Out</label>
                          <input
                            type="date"
                            id="check-out"
                            name="check-out"
                            min={getMinCheckout()}
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                          />
                        </div>
                        <button type="submit" className="book-villa-btn">
                          Book Now
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <h3 className="points-warning">
                        You still need {formatNumber(90000 - points)} points to
                        be able to book your vacation.
                      </h3>

                      <div className="redirect-btns">
                        <button
                          type="button"
                          className="redirect-btn"
                          onClick={() => navigate("/my-account")}
                        >
                          My Account
                        </button>
                        <button
                          type="button"
                          className="redirect-btn"
                          onClick={() => navigate("/")}
                        >
                          Homepage
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <p>{pending ? "Loading..." : "Failed to load"}</p>
              )}
            </>
          )}
        </>
      </div>

      {pending && <LoadingSpinner />}

      {showPopup && (
        <Popup
          msg={popupMsg}
          showPopup={() => setShowPopup(!showPopup)}
          class_={msgType}
        />
      )}

      <BackButton path="/" text="Back to Homepage" />
      <Footer />
    </>
  );
}

export default BookVilla;

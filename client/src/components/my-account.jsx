import { useContext } from "react";
import { UserContext } from "./App";
import BackButton from "./back-btn";
import Footer from "./footer";
import "../styles/my-account.css";

function MyAccount() {
  const userInfo = useContext(UserContext);

  return (
    <>
      <div className="account-container">
        <h1 className="welcome-title">~Hello {userInfo?.name}~</h1>

        <div className="points-info">
          <h3 className="points-text">
            Congratulations on earning so far {userInfo?.points} points!
          </h3>

          <h3 className="points-text">
            <span className="remaining-points">{90000 - userInfo?.points}</span>{" "}
            points to go to your dream vacation!
          </h3>
        </div>

        <button type="button" className="book-btn">
          Book Now
        </button>
      </div>

      <BackButton path="/" text="Back to Homepage" />
      <Footer />
    </>
  );
}

export default MyAccount;

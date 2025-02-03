import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import BackButton from "./back-btn";
import Footer from "./footer";
import "../styles/my-account.css";

function MyAccount() {
  const userInfo = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="account-container">
        {userInfo ? (
          <>
            <h1 className="welcome-title">~Hello {userInfo?.name}~</h1>

            <div className="points-info">
              <h3 className="points-text">
                {userInfo?.points > 0
                  ? `Congratulations on earning so far ${userInfo?.points} points!`
                  : "It's not to late to start earning your points!"}
              </h3>

              <h3 className="points-text">
                <span className="remaining-points">
                  {90000 - userInfo?.points}
                </span>{" "}
                points to go to your dream vacation!
              </h3>
            </div>

            <button type="button" className="book-btn">
              Book Now
            </button>
          </>
        ) : (
          <button type="button" onClick={() => navigate("/login")}>
            Log In
          </button>
        )}
      </div>

      <BackButton path="/" text="Back to Homepage" />
      <Footer />
    </>
  );
}

export default MyAccount;

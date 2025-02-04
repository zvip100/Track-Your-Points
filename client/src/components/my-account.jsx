import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import AccountTable from "./account-table";
import BackButton from "./back-btn";
import Footer from "./footer";
import { URL } from "../main";
import "../styles/my-account.css";

function MyAccount() {
  const userInfo = useContext(UserContext);
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFailed, setLoadingFailed] = useState(false);

  useEffect(() => {
    async function getUserHistory() {
      if (!userInfo) return;

      const user = userInfo?.id;
      setIsLoading(true);
      try {
        const response = await fetch(`${URL}/api/account/${user}/points`, {
          method: "GET",
        });

        const result = await response.json();
        console.log("Get user history fetch result: ", result);

        setAccountData(result);
      } catch (e) {
        console.error("Error getting user history: ", e.message);
        setLoadingFailed(true);
      } finally {
        setIsLoading(false);
      }
    }
    getUserHistory();
  }, []);

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

            {isLoading && (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading your points history...</p>
              </div>
            )}

            {accountData && (
              <>
                <h2 className="about-table">Points History:</h2>
                <AccountTable data={accountData} />
              </>
            )}

            {loadingFailed && (
              <p className="loading-failed-msg">
                Error loading your points history.
              </p>
            )}

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

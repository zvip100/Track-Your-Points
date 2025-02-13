import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import AccountTable from "./account-table";
import BackButton from "./back-btn";
import Footer from "./footer";
import { URL } from "../main";
import { scrollToTop, changeTitle, formatNumber } from "../helpers/utils";
import "../styles/my-account.css";

function MyAccount({ setUserInfo, title }) {
  const userInfo = useContext(UserContext);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);
  const [accountData, setAccountData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFailed, setLoadingFailed] = useState(false);

  useEffect(() => scrollToTop(), changeTitle(title), []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!userInfo && !token) {
      setLoggedIn(false);
    }
  }, [userInfo]);

  useEffect(() => {
    console.log("user info now: ", userInfo);

    async function getUserHistory() {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      setIsLoading(true);
      try {
        const response = await fetch(`${URL}/api/account/points`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        console.log("Get user history fetch result: ", result);

        setAccountData(result);

        console.log("user info is now...: ", userInfo);

        if (result.length > 0 && userInfo) {
          setUserInfo({
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            points: result[0].totalPoints,
          });
        }
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
        {loggedIn ? (
          <>
            <h1 className="welcome-title">~Hello {userInfo?.name}!~</h1>

            <div className="points-info">
              <h3 className="points-text">
                {userInfo?.points > 0
                  ? `Congratulations on earning so far ${formatNumber(
                      userInfo?.points
                    )} points!`
                  : "It's not to late to start earning your points!"}
              </h3>

              <h3 className="points-text">
                <span className="remaining-points">
                  {userInfo ? formatNumber(90000 - userInfo?.points) : "90,000"}
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

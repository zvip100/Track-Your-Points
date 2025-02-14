import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PointsTable from "./points-table";
import SearchUser from "./search-user";
import LoadingSpinner from "./loading";
import Popup from "./popup";
import BackButton from "./back-btn";
import Footer from "./footer";
import { URL } from "../main";
import { AdminContext } from "./App";
import { addAuthHeader } from "../helpers/admin";
import { scrollToTop, changeTitle } from "../helpers/utils";

function PointsHistory({ title }) {
  const [history, setHistory] = useState("");
  const [pending, setPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const navigate = useNavigate();
  const admin = useContext(AdminContext);

  useEffect(() => {
    scrollToTop();
    changeTitle(title);
  }, []);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("admin-token");
    if (!admin && !adminToken)
      navigate("/admin/login", { state: "points-history" });
  }, [admin]);

  useEffect(() => {
    async function GetHistory() {
      setPending(true);
      try {
        const response = await fetch(`${URL}/api/admin/points`, {
          method: "GET",
          headers: addAuthHeader(),
        });

        const result = await response.json();
        console.log(result);

        setPending(false);
        setHistory(result);
      } catch (e) {
        console.error("Error getting points history: ", e.message);
        setPending(false);
        setShowPopup(true);
      }
    }
    GetHistory();
  }, []);

  return (
    <>
      <h1 className="title">~Points History~</h1>

      {history && (
        <>
          <div className="options-container">
            <SearchUser
              searchResult={searchResult}
              setSearchResult={setSearchResult}
            />
          </div>

          <PointsTable data={history} searchResult={searchResult} />
        </>
      )}

      {pending && <LoadingSpinner />}

      {showPopup && (
        <>
          <Popup
            msg="Error getting the data. Please reload the page."
            showPopup={() => setShowPopup(!showPopup)}
            class_="error-msg"
          />{" "}
        </>
      )}

      <BackButton path="/admin" text="Back to Admin page" />
      <Footer />
    </>
  );
}

export default PointsHistory;

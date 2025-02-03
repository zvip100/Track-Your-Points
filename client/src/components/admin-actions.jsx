import "../styles/admin-actions.css";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { addPoints } from "../helpers/admin.js";
import Popup from "./popup.jsx";
import LoadingSpinner from "./loading.jsx";

function AdminActions({ user, email, setUser, setEmail, setReloadPage }) {
  const [points, setPoints] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [msgType, setMsgType] = useState(false);
  const [pending, setPending] = useState(false);

  async function handlePointsClick() {
    if (!points) {
      setPoints("points");
      return;
    } else {
      if (points === "points") return;

      setPending(true);
      const toNumber = Number.parseInt(points);

      const result = await addPoints(user, toNumber);
      console.log(result);

      setPending(false);
      setShowPopup(true);
      setPoints("");

      if (result?.error) {
        setPopupMsg("Action failed. Please try again.");
        setMsgType("error-msg");
        return;
      }

      setPopupMsg(`Successfully added points to ${email}'s account.`);
      setMsgType("success-msg");
      setReloadPage();
      setTimeout(() => setUser(), 5000);
    }
  }
  return (
    <div className="admin-popup">
      <div className="admin-popup-overlay">
        <div className="admin-popup-content">
          <button
            type="button"
            className="admin-close-btn"
            onClick={() => {
              setUser();
              setEmail();
            }}
          >
            <IoClose size={24} />
          </button>
          <h3 className="admin-title">Account: {email}</h3>

          {points && (
            <>
              <input
                type="number"
                className="points-input"
                placeholder="Enter amount of points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                autoFocus
              ></input>
            </>
          )}
          <div>
            <button
              type="button"
              className="admin-btn"
              onClick={handlePointsClick}
            >
              Add Points
            </button>
          </div>

          <p className="admin-footer-text">
            Click on the close Icon at the top right corner to exit.
          </p>

          {showPopup && (
            <Popup
              msg={popupMsg}
              showPopup={() => setShowPopup(!showPopup)}
              class_={msgType}
            />
          )}
        </div>
      </div>

      {pending && <LoadingSpinner />}
    </div>
  );
}

export default AdminActions;

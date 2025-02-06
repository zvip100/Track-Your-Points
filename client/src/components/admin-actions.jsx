import "../styles/admin-actions.css";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { addPoints } from "../helpers/admin.js";
import Popup from "./popup.jsx";
import LoadingSpinner from "./loading.jsx";
import { formatNumber } from "../helpers/utils.js";

function AdminActions({
  user,
  email,
  setUser,
  setEmail,
  setReloadPage,
  setShowPopup,
  setPopupMsg,
  setMsgType,
  setPopupNote,
}) {
  const [points, setPoints] = useState("");
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

      setPopupMsg(
        `Successfully added ${formatNumber(
          points
        )} points to ${email}'s account.`
      );
      setMsgType("success-msg");
      setPopupNote("Table has been updated.");
      setUser("");
      setEmail("");
      setReloadPage();
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
        </div>
      </div>

      {pending && <LoadingSpinner />}
    </div>
  );
}

export default AdminActions;

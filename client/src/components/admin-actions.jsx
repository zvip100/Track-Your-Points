import "../styles/admin-actions.css";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { handlePoints } from "../helpers/admin.js";
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
  const [action, setAction] = useState("");

  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (!points || points === "0") {
      return;
    } else {
      setPending(true);
      const toNumber = Number.parseInt(
        action === "add-points" ? points : -points
      );

      const result = await handlePoints(action, user, toNumber);
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
        `Successfully ${
          action === "add-points" ? "added" : "removed"
        } ${formatNumber(points)} points ${
          action === "add-points" ? "to" : "from"
        } ${email}'s account.`
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

          {!action ? (
            <>
              <button
                type="button"
                className="admin-btn"
                value="add-points"
                onClick={(e) => setAction(e.target.value)}
              >
                Add Points
              </button>{" "}
              <button
                type="button"
                className="admin-btn"
                value="remove-points"
                onClick={(e) => setAction(e.target.value)}
              >
                Remove Points
              </button>{" "}
            </>
          ) : (
            <>
              <input
                type="number"
                className="points-input"
                placeholder="Enter amount of points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                autoFocus
              ></input>
              <button type="button" className="admin-btn" onClick={handleClick}>
                {action === "add-points" ? "Add Points" : "Remove Points"}
              </button>{" "}
              <button
                type="button"
                className="admin-btn"
                onClick={() => {
                  setAction("");
                  setPoints("");
                }}
              >
                Cancel
              </button>
            </>
          )}

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

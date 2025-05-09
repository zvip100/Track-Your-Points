import { useState } from "react";
import { IoClose } from "react-icons/io5";
import LoadingSpinner from "./loading";
import { confirmBooking } from "../helpers/admin";
import "../styles/admin-booking-actions.css";

function AdminBookingActions({
  user,
  setUser,
  setShowPopup,
  setPopupMsg,
  setMsgType,
  setPopupNote,
  setReloadPage,
}) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    console.log("Confirming booking for user: ", user?.account);

    setPending(true);

    const result = await confirmBooking(user?.id);
    console.log(result);

    setPending(false);
    setShowPopup(true);

    if (result?.error) {
      setPopupMsg("Action failed. Please try again.");
      setMsgType("error-msg");
      return;
    }
    setPopupMsg(`Successfully confirmed booking for ${user?.account}.`);
    setMsgType("success-msg");
    setPopupNote("Table has been updated.");
    setUser("");
    setReloadPage();
  }

  return (
    <div className="admin-popup">
      <div className="admin-popup-overlay">
        <div className="admin-popup-content">
          <button
            type="button"
            className="admin-close-btn"
            onClick={() => {
              setUser("");
            }}
          >
            <IoClose size={24} />
          </button>
          <h3 className="admin-title">Confirm Booking for {user?.account}</h3>
          <div className="admin-note">
            <p>
              Note: Only confirm this booking when "wave Kosher Villas" has
              confirmed it from their end, since this action will remove the
              necessary points from the user's account.
            </p>
          </div>
          <button type="button" className="admin-btn" onClick={handleClick}>
            Confirm Booking
          </button>{" "}
          <p className="admin-footer-text">
            Click on the close Icon at the top right corner to exit.
          </p>
        </div>
      </div>

      {pending && <LoadingSpinner />}
    </div>
  );
}

export default AdminBookingActions;

import { formatBookingDate, formatBookingStatus } from "../helpers/utils";
import "../styles/my-booking.css";

function MyBooking({ bookingInfo }) {
  return (
    <div className="my-booking">
      <div className="booking-card">
        <div className="booking-header">
          <h2>Booking Details</h2>
          <span
            className={`status-badge ${formatBookingStatus(
              bookingInfo.status
            )}`}
          >
            {formatBookingStatus(bookingInfo.status)}
          </span>
        </div>

        <div className="booking-dates">
          <div className="date-group">
            <label>Check In</label>
            <p>{formatBookingDate(bookingInfo.checkIn)}</p>
          </div>
          <div className="date-group">
            <label>Check Out</label>
            <p>{formatBookingDate(bookingInfo.checkOut)}</p>
          </div>
        </div>

        {bookingInfo.status === "P" && (
          <p className="pending-message">
            Please check your email soon for booking status updates.
          </p>
        )}

        <div className="booking-footer">
          <p className="booking-created">
            Requested on: {bookingInfo.date} at {bookingInfo.time}
          </p>
        </div>
      </div>

      <div className="booking-actions">
        <button
          className="modify-booking-btn"
          onClick={() => {
            console.log("Modify booking clicked");
          }}
        >
          Modify Booking
        </button>

        <button
          className="cancel-booking-btn"
          onClick={() => {
            console.log("Cancel booking clicked");
          }}
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
}

export default MyBooking;

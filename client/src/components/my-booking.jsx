import { useState, useEffect } from "react";
import "../styles/my-booking.css";

function MyBooking({ bookingInfo }) {
  const formatBookingDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="booking-card">
      <div className="booking-header">
        <h2>Booking Details</h2>
        <span
          className={`status-badge ${
            bookingInfo.confirmed ? "confirmed" : "pending"
          }`}
        >
          {bookingInfo.confirmed ? "Confirmed" : "Pending"}
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

      {!bookingInfo.confirmed && (
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
  );
}

export default MyBooking;

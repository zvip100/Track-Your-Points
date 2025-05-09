import { useState, useEffect } from "react";
import { formatNumber } from "../helpers/utils";
import { IoHome } from "react-icons/io5";

function AccountMsg({ userInfo, bookingInfo, navigate }) {
  const [hasBooking, setHasBooking] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (bookingInfo) {
      setHasBooking(true);
      if (bookingInfo?.status === "C") setConfirmed(true);
    }
  }, [bookingInfo]);

  return (
    <div className="points-info">
      {hasBooking ? (
        <>
          {confirmed ? (
            <>
              <h3 className="confirmed-msg">Your booking is confirmed!</h3>
              <h3 className="points-text">
                You currently have{" "}
                <span className="remaining-points">
                  {formatNumber(userInfo?.points)}
                </span>{" "}
                points left!
              </h3>
            </>
          ) : (
            <>
              <h3 className="points-text">
                Congratulations for reaching 90,000 points!
              </h3>

              <h3 className="points-text">
                Your total points is:{" "}
                <span className="remaining-points">
                  {formatNumber(userInfo?.points)}
                </span>
                !
              </h3>

              <p className="pending-msg">
                You currently have a pending booking request
              </p>
            </>
          )}

          <BookBtn hasBooking={true} navigate={navigate} />
        </>
      ) : (
        <>
          <h3 className="points-text">
            {userInfo?.points > 0
              ? `Congratulations for ${
                  userInfo?.points >= 90000 ? "reaching" : "earning so far"
                } ${formatNumber(userInfo?.points)} points!`
              : "It's not to late to start earning your points!"}
          </h3>

          {userInfo?.points >= 90000 ? (
            <h3 className="points-text">Book now your dream vacation! </h3>
          ) : (
            <h3 className="points-text">
              <span className="remaining-points">
                {formatNumber(90000 - userInfo?.points)}
              </span>{" "}
              points to go to your dream vacation!
            </h3>
          )}

          {userInfo?.points >= 90000 && (
            <BookBtn hasBooking={false} navigate={navigate} />
          )}
        </>
      )}
    </div>
  );
}

function BookBtn({ hasBooking, navigate }) {
  return (
    <button
      type="button"
      className="book-btn"
      onClick={() => navigate("/book-villa")}
    >
      <IoHome size={24} />
      {hasBooking ? "My Booking" : "Book Villa"}
    </button>
  );
}

export default AccountMsg;

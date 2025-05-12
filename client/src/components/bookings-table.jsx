import { useState } from "react";
import { formatBookingDate, formatBookingStatus } from "../helpers/utils";
import AdminBookingActions from "./admin-booking-actions";
import Popup from "./popup";

function BookingsTable({ data, setReloadPage }) {
  const [user, setUser] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [msgType, setMsgType] = useState(false);
  const [popupNote, setPopupNote] = useState("");

  return (
    <>
      <p className="table-row-amount">
        Total Records:
        <span>{data.length}</span>
      </p>

      <div className="user-table">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Account</th>
                <th scope="col">Check In</th>
                <th scope="col">Check Out</th>
                <th scope="col">Status</th>
                <th scope="col">Requested On</th>
                <th scope="col">Confirmed On</th>
              </tr>
            </thead>

            <tbody>
              {data.map((record, index) => (
                <tr
                  key={record.id}
                  onClick={() =>
                    record.status === "P" &&
                    setUser({
                      id: record.user,
                      account: record.email,
                      checkIn: formatBookingDate(record.checkIn),
                      checkOut: formatBookingDate(record.checkOut),
                    })
                  }
                >
                  <td>{index + 1}</td>
                  <td>{record.email}</td>
                  <td>{formatBookingDate(record.checkIn)}</td>
                  <td>{formatBookingDate(record.checkOut)}</td>
                  <td
                    style={
                      record.status === "C"
                        ? { background: "#dcfce7", color: "#166534" }
                        : { background: "#fff7ed", color: "#c2410c" }
                    }
                  >
                    {formatBookingStatus(record.status)}
                  </td>
                  <td>{record.requestedOn}</td>
                  <td>
                    {record.confirmedOn ? record.confirmedOn : "Not confirmed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {user && (
        <AdminBookingActions
          user={user}
          setUser={setUser}
          setShowPopup={() => setShowPopup(!showPopup)}
          setPopupMsg={setPopupMsg}
          setMsgType={setMsgType}
          setPopupNote={setPopupNote}
          setReloadPage={setReloadPage}
        />
      )}

      {showPopup && (
        <Popup
          msg={popupMsg}
          showPopup={() => setShowPopup(!showPopup)}
          class_={msgType}
          note={popupNote}
        />
      )}
    </>
  );
}

export default BookingsTable;

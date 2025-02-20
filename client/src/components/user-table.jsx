import { useState } from "react";
import AdminActions from "./admin-actions";
import Popup from "./popup";
import { formatNumber } from "../helpers/utils";
import { IoCheckmarkCircle } from "react-icons/io5";
import { capitalize, formatEmail } from "../helpers/utils";

function UserTable({ users, searchResult, setReloadPage }) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [msgType, setMsgType] = useState(false);
  const [popupNote, setPopupNote] = useState("");

  return (
    <>
      <p className="table-row-amount">
        Total Users:
        <span>{users.length}</span>
      </p>

      <div className="user-table">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Status</th>
                <th scope="col">Total Points</th>
              </tr>
            </thead>

            <tbody>
              {searchResult &&
                users
                  .filter(
                    (row) =>
                      row.email === formatEmail(searchResult) ||
                      row.firstName === capitalize(searchResult) ||
                      row.lastName === capitalize(searchResult) ||
                      `${row.firstName} ${row.lastName}` ===
                        capitalize(searchResult) ||
                      `${row.lastName} ${row.firstName}` ===
                        capitalize(searchResult)
                  )
                  .map((row) => (
                    <tr
                      key={row.id}
                      className="searched-row"
                      onClick={() => {
                        setUser(row.id), setEmail(row.email);
                      }}
                    >
                      <td>
                        {" "}
                        <IoCheckmarkCircle
                          size={24}
                          color="#22c55e"
                          className="check-icon"
                        />
                      </td>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.email}</td>
                      <td>{row.status}</td>
                      <td>{formatNumber(row.points)}</td>
                    </tr>
                  ))}

              {users.map((user, index) => (
                <tr
                  key={user.id}
                  onClick={() => {
                    setUser(user.id), setEmail(user.email);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td>{formatNumber(user.points)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {user && (
        <AdminActions
          user={user}
          email={email}
          setUser={() => setUser("")}
          setEmail={() => setEmail("")}
          setReloadPage={setReloadPage}
          setShowPopup={() => setShowPopup(!showPopup)}
          setPopupMsg={setPopupMsg}
          setMsgType={setMsgType}
          setPopupNote={setPopupNote}
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

export default UserTable;

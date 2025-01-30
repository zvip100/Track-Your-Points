import { useState, useEffect } from "react";
import UserTable from "./user-table";
import Popup from "./popup";
import LoadingSpinner from "./loading";
import BackButton from "./back-btn";
import Footer from "./footer";
import "../styles/all-users.css";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    async function getUsers() {
      setPending(true);

      try {
        const response = await fetch("http://localhost:3000/admin/get-users", {
          method: "GET",
        });

        const result = await response.json();
        console.log(result);

        setUsers(result);
      } catch (e) {
        console.error("Error getting users: ", e.message);
        setShowPopup(true);
      }
      setPending(false);
    }
    getUsers();
  }, [reloadPage]);

  return (
    <>
      <h1 className="title">~All Users~</h1>

      {users.length > 0 && (
        <>
          <h3 className="options-msg">Click on a any User for more options.</h3>

          <UserTable
            users={users}
            setReloadPage={() => setReloadPage(!reloadPage)}
          />
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

export default AllUsers;

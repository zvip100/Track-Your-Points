import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./admin-sidebar";
import BookingsTable from "./bookings-table";
import LoadingSpinner from "./loading";
import Popup from "./popup";
import BackButton from "./back-btn";
import Footer from "./footer";
import { URL } from "../main";
import { AdminContext } from "./App";
import { scrollToTop, changeTitle } from "../helpers/utils";
import { addAuthHeader } from "../helpers/admin";
import "../styles/all-bookings.css";

function AllBookings({ setAdminInfo, title }) {
  const [bookings, setBookings] = useState([]);
  const [noBookings, setNoBookings] = useState(false);
  const [pending, setPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const navigate = useNavigate();
  const admin = useContext(AdminContext);

  useEffect(() => {
    scrollToTop();
    changeTitle(title);
  }, []);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("admin-token");
    if (!admin && !adminToken)
      navigate("/admin/login", { state: "all-bookings" });
  }, [admin]);

  useEffect(() => {
    async function getBookings() {
      setPending(true);

      try {
        const response = await fetch(`${URL}/api/admin/bookings`, {
          method: "GET",
          headers: addAuthHeader(),
        });

        const result = await response.json();
        console.log(result);
        setPending(false);

        if (result === "No bookings found") {
          setNoBookings(true);
          return;
        }

        setBookings(result);
      } catch (e) {
        console.error("Error getting bookings: ", e.message);
        setShowPopup(true);
      }
    }
    getBookings();
  }, [reloadPage]);

  return (
    <>
      <AdminSidebar setAdminInfo={setAdminInfo} />

      <h1 className="title">~All Bookings~</h1>

      {noBookings && <h3 className="no-bookings-msg">No Bookings Found!</h3>}

      {bookings.length > 0 && (
        <>
          <h3 className="options-msg">
            Confirm a Pending Booking by clicking on the specific row
          </h3>
          <BookingsTable
            data={bookings}
            setReloadPage={() => setReloadPage(!reloadPage)}
          />
        </>
      )}

      {pending && <LoadingSpinner />}

      {showPopup && (
        <Popup
          msg="Error getting the data. Please reload the page."
          showPopup={() => setShowPopup(!showPopup)}
          class_="error-msg"
        />
      )}

      <BackButton path="/admin" text="Back to Admin page" />
      <Footer />
    </>
  );
}

export default AllBookings;

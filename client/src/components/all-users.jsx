import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./admin-sidebar";
import UserTable from "./user-table";
import SearchUser from "./search-user";
import SortTable from "./sort-table";
import Popup from "./popup";
import LoadingSpinner from "./loading";
import BackButton from "./back-btn";
import Footer from "./footer";
import { URL } from "../main";
import { AdminContext } from "./App";
import { scrollToTop, changeTitle } from "../helpers/utils";
import { addAuthHeader } from "../helpers/admin";
import "../styles/all-users.css";

function AllUsers({ setAdminInfo, title }) {
  const [users, setUsers] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [pending, setPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);
  const navigate = useNavigate();
  const admin = useContext(AdminContext);

  useEffect(() => {
    scrollToTop();
    changeTitle(title);
  }, []);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("admin-token");
    if (!admin && !adminToken) navigate("/admin/login", { state: "all-users" });
  }, [admin]);

  useEffect(() => {
    async function getUsers() {
      setPending(true);

      try {
        const response = await fetch(`${URL}/api/admin/get-users`, {
          method: "GET",
          headers: addAuthHeader(),
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
      <AdminSidebar setAdminInfo={setAdminInfo} />

      <h1 className="title">~All Users~</h1>

      {users.length > 0 && (
        <>
          <h3 className="options-msg">
            Click on a specific user to add or remove points to his account.
          </h3>

          <div className="options-container">
            <SearchUser
              searchResult={searchResult}
              setSearchResult={setSearchResult}
            />

            <SortTable
              users={users}
              setReloadTable={() => setReloadTable(!reloadTable)}
            />
          </div>

          <UserTable
            users={users}
            searchResult={searchResult}
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

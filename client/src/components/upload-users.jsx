import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./App";
import { AdminHeader } from "./admin";
import FileInput from "./file-input";
import Footer from "./footer";
import exempleImage from "../assets/user-sheet-exemple.png";
import { scrollToTop, changeTitle } from "../helpers/utils";
import "../styles/upload-users.css";

function UploadUsers({ setAdminInfo, title }) {
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();
  const admin = useContext(AdminContext);

  useEffect(() => {
    scrollToTop();
    changeTitle(title);
  }, []);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("admin-token");
    if (!admin && !adminToken)
      navigate("/admin/login", { state: "upload-users" });
  }, [admin]);

  return (
    <>
      <AdminHeader
        setAdminInfo={setAdminInfo}
        path="/admin"
        text="Main Admin page"
      />

      <div className="upload-container">
        {uploaded ? (
          <h1>~Users Uploaded~</h1>
        ) : (
          <>
            <h1>~Upload Users~</h1>

            <div className="upload-header">
              <h3>Upload en Excel Sheet containing the following data:</h3>

              <p>First Name, Last Name, & Email Address.</p>

              <h4>Example:</h4>

              <div className="example-image-container">
                <img src={exempleImage} alt="Excel Sheet exemple" />
              </div>
            </div>
          </>
        )}

        <FileInput uploaded={uploaded} setUploaded={setUploaded} />
      </div>

      <Footer />
    </>
  );
}

export default UploadUsers;

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./App";
import FileInput from "./file-input";
import BackButton from "./back-btn";
import Footer from "./footer";
import exempleImage from "../assets/user-sheet-exemple.png";
import { scrollToTop, changeTitle } from "../helpers/utils";
import "../styles/upload-users.css";

function UploadUsers({ title }) {
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();
  const admin = useContext(AdminContext);

  useEffect(() => {
    scrollToTop();
    changeTitle(title);

    if (!admin) navigate("/admin/login", { state: "upload-users" });
  }, []);

  return (
    <>
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

      <BackButton path="/admin" text="Back to Admin page" />
      <Footer />
    </>
  );
}

export default UploadUsers;

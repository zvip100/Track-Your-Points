import React, { useState } from "react";
import FileInput from "./file-input";
import BackButton from "./back-btn";
import exempleImage from "../assets/user-sheet-exemple.png";
import "../styles/upload-users.css";

function UploadUsers() {
  const [uploaded, setUploaded] = useState(false);

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

        <BackButton />
      </div>
    </>
  );
}

export default UploadUsers;

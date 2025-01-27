import { useState } from "react";
import * as XLSX from "xlsx";
import DataDisplay from "./data-display";
import Popup from "./popup";
import "../styles/file-input.css";

function FileInput({ uploaded, setUploaded }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setError(""); // Reset error on new upload

    // Check file extension
    const allowedTypes = [".xlsx", ".xls"];
    const fileExtension = file?.name
      .toLowerCase()
      .slice(file.name.lastIndexOf("."));

    if (!allowedTypes.includes(fileExtension)) {
      setError("Please upload only Excel files! (.xlsx or .xls)");
      event.target.value = ""; // Reset input
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      } catch (error) {
        console.error("Error processing file:", error);
      }
    };

    reader.onerror = (error) => {
      setError("Error reading file. Please try again.");
      console.error("Error reading file:", error);
    };

    reader.readAsArrayBuffer(file);
  };

  if (error) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  return (
    <>
      <div className="file-input-container">
        {!uploaded && (
          <div className="custom-file-input">
            <label className="custom-file-label">
              Upload Excel Sheet
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}
      </div>

      {error && (
        <Popup msg={error} showPopup={() => setError("")} class_="error-msg" />
      )}

      {data?.length > 0 && (
        <DataDisplay data={data} setUploaded={setUploaded} />
      )}
    </>
  );
}

export default FileInput;

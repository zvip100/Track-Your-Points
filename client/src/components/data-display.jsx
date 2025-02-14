import { useEffect, useState } from "react";
import Popup from "./popup";
import LoadingSpinner from "./loading";
import { URL } from "../main";
import { capitalize } from "../helpers/utils";
import { addAuthHeader } from "../helpers/admin";
import "../styles/data-display.css";

function DataDisplay({ data, setUploaded }) {
  const [formattedData, setFormattedData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Display name mapping
  const headerMapping = {
    firstName: {
      display: "First Name",
      matches: ["firstname", "first_name", "fname"],
    },
    lastName: {
      display: "Last Name",
      matches: ["lastname", "last_name", "lname"],
    },
    email: {
      display: "Email Address",
      matches: ["email", "email_address", "emailaddress"],
    },
  };

  const normalizeKey = (key) => {
    return key
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");
  };

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      // Get normalized keys from first row
      const rowKeys = Object.keys(data[0]).map((key) => normalizeKey(key));

      // Check for all required fields
      const hasFirstName = rowKeys.some((key) =>
        headerMapping.firstName.matches.includes(key)
      );
      const hasLastName = rowKeys.some((key) =>
        headerMapping.lastName.matches.includes(key)
      );
      const hasEmail = rowKeys.some((key) =>
        headerMapping.email.matches.includes(key)
      );

      // Require all three fields
      if (!hasFirstName || !hasLastName || !hasEmail) {
        setMsg(
          "Excel sheet must contain First Name, Last Name, & Email Address columns! Please check your file and try again."
        );
        setMsgType("error-msg");
        setUploaded(false);
        return;
      }

      const processedData = data.map((row) => {
        const formattedRow = {};
        Object.keys(row).forEach((key) => {
          const normalizedKey = normalizeKey(key);

          // Check each field type
          for (const [fieldType, config] of Object.entries(headerMapping)) {
            if (config.matches.includes(normalizedKey)) {
              formattedRow[fieldType] = row[key];
              break;
            }
          }
        });
        return formattedRow;
      });

      setHeaders(Object.keys(headerMapping));
      setFormattedData(processedData);
      setUploaded(true);
      setMsg("Users uploaded successfully!");
      setMsgType("success-msg");
    }
  }, [data]);

  const handleSaveUsers = async () => {
    setIsSaving(true);
    try {
      const usersToSave = formattedData.map((row) => ({
        firstName: capitalize(row.firstName),
        lastName: capitalize(row.lastName),
        email: row.email.toLowerCase(),
      }));

      const response = await fetch(`${URL}/api/admin/add-user`, {
        method: "POST",
        headers: addAuthHeader(),
        body: JSON.stringify(usersToSave),
      });

      const result = await response.json();
      if (result === "already added") {
        setMsg("Users already added to database!");
        setMsgType("error-msg");
        return;
      }
      if (response.ok) {
        setMsg("Users saved to database successfully!");
        setMsgType("success-msg");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setMsg("Error saving users. Please try again.");
      setMsgType("error-msg");
    } finally {
      setIsSaving(false);
    }
  };

  if (msg) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{headerMapping[header].display}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {formattedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {formattedData.length > 0 && (
        <button
          onClick={handleSaveUsers}
          disabled={isSaving}
          className="save-button"
        >
          {isSaving ? "Saving..." : "Save All Users"}
        </button>
      )}

      {msg && <Popup msg={msg} showPopup={() => setMsg("")} class_={msgType} />}

      {isSaving && <LoadingSpinner />}
    </div>
  );
}

export default DataDisplay;

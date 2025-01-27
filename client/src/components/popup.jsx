import "../styles/popup.css";
import { IoClose } from "react-icons/io5";

function Popup({ msg, showPopup, class_ }) {
  return (
    <div className="popup">
      <div className="popup-overlay" onClick={showPopup}>
        <div className="popup-content">
          <button type="button" className="close-btn" onClick={showPopup}>
            <IoClose size={24} />
          </button>
          <h2 className={class_}>{msg}</h2>
        </div>
      </div>
    </div>
  );
}

export default Popup;

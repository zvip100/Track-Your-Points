import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/back-btn.css";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="back-btn-container" data-tooltip="Back to Homepage">
      <IoArrowBackCircle
        className="back-button"
        onClick={() => navigate("/")}
        size={60}
      />
    </div>
  );
}

export default BackButton;

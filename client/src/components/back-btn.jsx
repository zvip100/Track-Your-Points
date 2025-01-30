import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/back-btn.css";

function BackButton({path, text}) {
  const navigate = useNavigate();

  return (
    <div className="back-btn-container" data-tooltip={text}>
      <IoArrowBackCircle
        className="back-button"
        onClick={() => navigate(path)}
        size={60}
      />
    </div>
  );
}

export default BackButton;

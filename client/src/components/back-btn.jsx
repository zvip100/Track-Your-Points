import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/is-mobile";
import "../styles/back-btn.css";

function BackButton({ path, text }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="back-btn-container" data-tooltip={text}>
      <IoArrowBackCircle
        className="back-button"
        onClick={() => navigate(path)}
        size={isMobile ? 40 : 60}
      />
    </div>
  );
}

export default BackButton;

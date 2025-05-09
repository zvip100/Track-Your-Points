import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import "../styles/villa-modal.css";

function VillaModal({ onClose }) {
  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <IoClose size={26} />
        </button>
        <h2 className="modal-title">&middot; Fountainview Villa &middot;</h2>
        <p>Accommodates: 10</p>
        <p>
          Private Villa • Lakefront • 5 Bedrooms • 10 Beds • 3 Bath • Kosher
          Kitchen • Private Heated Pool • Jacuzzi • WIFI • 7 Min Walking
          Distance to Shul
        </p>
        <div>
          <h3 className="amenities">Villa Amenities:</h3>
          <ul>
            <li>A/C</li>
            <li>WiFi</li>
            <li>Shower</li>
            <li>Bath</li>
            <li>kosher Kitchen</li>
            <li>Towels</li>
            <li>Hot Tub</li>
            <li>Pool</li>
          </ul>
        </div>

        <h3 className="more-details">
          For more details visit{" "}
          <a
            href="https://www.wavekoshervillas.com/book-a-room/rooms/d27e8491-c95e-4898-871d-0ed46be0abd9"
            target="_blank"
            rel="noopener noreferrer"
            className="wave-link"
          >
            Wave Kosher Villas
          </a>
        </h3>
      </div>
    </div>
  );
}

export default VillaModal;

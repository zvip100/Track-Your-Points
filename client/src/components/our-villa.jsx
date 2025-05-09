import img1 from "../assets/villa.jpg";
import img2 from "../assets/villa-pool.jpg";
import img3 from "../assets/living-room.jpg";
import img4 from "../assets/kitchen.jpg";
import img5 from "../assets/villa5.jpg";
import img6 from "../assets/villa6.jpg";
import img7 from "../assets/villa7.jpg";
import img8 from "../assets/villa8.jpg";
import img9 from "../assets/villa9.jpg";
import img10 from "../assets/villa10.jpg";
import img11 from "../assets/villa11.jpg";
import img12 from "../assets/villa12.jpg";
import img13 from "../assets/villa13.jpg";
import img14 from "../assets/villa14.jpg";
import img15 from "../assets/villa15.jpg";
import img16 from "../assets/villa16.jpg";
import VillaModal from "./villa-modal.jsx";
import Footer from "./footer.jsx";
import { IoInformationCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { scrollToTop, changeTitle } from "../helpers/utils.js";
import "../styles/our-villa.css";

function OurVilla({ title }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    scrollToTop();
    changeTitle(title);
    document.body.classList.add("our-villa");

    return () => {
      document.body.classList.remove("our-villa");
    };
  }, []);

  return (
    <>
      {showModal && <VillaModal onClose={() => setShowModal(false)} />}

      <main className={"main-content " + "main"}>
        <div className={"centered-content " + "content"}>
          <h1 className="title">Meet Our Villa!</h1>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="details-btn"
          >
            <IoInformationCircle size={20} />
            Villa Details
          </button>

          <div className="img-grid">
            <img
              src={img1}
              alt="Front view of our villa"
              title="Front of our villa"
            />
            <img
              src={img5}
              alt="Front view of our villa"
              title="Front of our villa"
            />

            <img
              src={img3}
              alt="Living room of our villa"
              title="Our living room"
            />
            <img
              src={img6}
              alt="Living room of our villa"
              title="Our living room"
            />
            <img
              src={img7}
              alt="Living room of our villa"
              title="Our living room"
            />
            <img src={img4} alt="Kitchen of our villa" title="Our kitchen" />
            <img src={img8} alt="Kitchen of our villa" title="Our kitchen" />
            <img src={img9} alt="Kitchen of our villa" title="Our kitchen" />
            <img
              src={img10}
              alt="Kitchen of our villa"
              title="Our kitchen"
            ></img>
            <img src={img11} alt="Bedroom in our villa" title="Bedroom"></img>
            <img src={img12} alt="Bathroom in our villa" title="Bathroom"></img>
            <img
              src={img13}
              alt="Master bedroom in our villa"
              title="The master bedroom"
            ></img>
            <img
              src={img14}
              alt="Master bedroom in our villa"
              title="The master bedroom"
            ></img>
            <img
              src={img15}
              alt="Master bedroom in our villa"
              title="The master bedroom"
            ></img>
            <img
              src={img16}
              alt="Master bedroom in our villa"
              title="The master bedroom"
            ></img>
            <img
              src={img2}
              alt="Pool area of our villa"
              title="Our pool area"
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default OurVilla;

import { useState } from "react";
import logo from "../assets/logo.svg";
import villaImg from "../assets/tampa.jpg";
//import LoadingSpinner from "./loading";
import "../styles/App.css";
import Footer from "./footer";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [points, setPoints] = useState();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function requestMsg() {
    if (msg) {
      setMsg("");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/about", {
        method: "GET",
      });

      const result = await response.text();
      setMsg(result);
    } catch (e) {
      console.error(e);
    }
  }

  async function getMyPoints() {
    if (points) {
      setPoints();
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/my-points", {
        method: "GET",
      });

      const result = await response.json();

      setPoints(result);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className="nav">
        <div className="nav-btn-group">
          <a href="https://www.starlifevacation.com/" target="_blank">
            <button type="button">Gallery</button>
          </a>{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Log In
          </button>{" "}
          <button type="button" onClick={() => navigate("/sign-up")}>
            Sign Up
          </button>{" "}
          <button type="button" onClick={() => navigate("/admin")}>
            Admin
          </button>
        </div>
      </div>

      <main className="main-content">
        <a
          className="logo react"
          href="https://www.starlifevacation.com/"
          target="_blank"
        >
          <img src={logo} className="logo react" alt="Website logo" />
        </a>

        <div className="centered-content">
          <div className="background-img"></div>
          <h1 className="title">Track Your Points!</h1>

          {msg && (
            <div>
              <h2>{msg}</h2>

              <img
                src="https://static.wixstatic.com/media/bbcd57_17210834dd8947e78c062348767c9237~mv2.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/bbcd57_17210834dd8947e78c062348767c9237~mv2.jpg"
                alt="Image of our villa in Tampa Florida"
                width="70%"
                height="50%"
              ></img>

              <div>
                <Link to="/about">How it Works</Link>{" "}
              </div>
            </div>
          )}

          <div>
            <button type="button" onClick={requestMsg}>
              {msg ? "Dismiss" : "About"}
            </button>
          </div>
          <div>
            <button type="button" onClick={getMyPoints}>
              My Points
            </button>
          </div>

          {points && (
            <div>
              <h3>Hello {points.name}!</h3>
              <h2>You've earned so far: {points.points} Points!</h2>
              <h3>
                {points.needs} more points to go to your dream vacation...!
              </h3>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;

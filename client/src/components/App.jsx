import { useState } from "react";
import logo from "../assets/logo.svg";
//import LoadingSpinner from "./loading";
import "../styles/App.css";
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
      const response = await fetch("http://localhost:3000/", {
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
          <h1 className="title">Track Your Points!</h1>

          {msg && (
            <div>
              <h2>{msg}</h2>

              <img
                src="https://lh3.googleusercontent.com/fQ8xCHtldG1qnPMnT-IzpCjMjv3ZbBKikg-NuOo1tBrH32zaBjE3R9E863PP4pLW3sykdmC_p9QNHMyjpUM1IZ0Or184WQHLPBUN9yTvP6qTd72Jwpo3Ho87g_eznJVLEA=w1280"
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
    </>
  );
}

export default App;

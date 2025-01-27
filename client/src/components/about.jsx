import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate()
  return (
    <>
      <h1>Coming Soon... </h1>

      <button type="button" onClick={() => navigate("/")}>
        Return
      </button>
    </>
  );
}

export default About;

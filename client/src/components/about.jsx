import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { scrollToTop, changeTitle } from "../helpers/utils";

function About({ title }) {
  useEffect(() => {
    scrollToTop();
    changeTitle(title);
  }, []);

  const navigate = useNavigate();
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

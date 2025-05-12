import { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserContext } from "./App";
import InputField from "./input-field";
import { loginForm } from "../data";
import { useFormik } from "formik";
import loginSchema from "../login-schema";
import BackButton from "./back-btn";
import Popup from "./popup";
import LoadingSpinner from "./loading";
import Footer from "./footer";
import { URL } from "../main";
import { scrollToTop, changeTitle, formatNumber } from "../helpers/utils";

function Login({ setUserInfo, title }) {
  const [pending, setPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loginResult, setLoginResult] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
    changeTitle(title);
  }, []);

  useEffect(() => {
    let timeoutId;

    if (loginResult) {
      timeoutId = setTimeout(() => {
        if (location?.state) navigate(location?.state);
        else navigate("/");
      }, 3000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loginResult]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  async function handleLogin(values, { resetForm }) {
    setPending(true);
    try {
      const response = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: values.email.toLowerCase(),
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log(result);

      resetForm();
      setShowPopup(true);
      setPending(false);

      if (result === "User not found") {
        setPopupMsg(
          "User not found. Please try again with your correct information."
        );
        setMsgType("error-msg");
        return;
      }

      setLoginResult(result);

      if (result[0].points > 0) {
        setPopupMsg(
          `Hello ${result[0].firstName} ${
            result[0].lastName
          }! You already earned ${formatNumber(
            result[0].points
          )} points! Keep it up!`
        );
      } else {
        setPopupMsg(
          `Hello ${result[0].firstName} ${result[0].lastName}! Redirecting you to the Homepage.`
        );
      }

      setMsgType("success-msg");

      sessionStorage.setItem("token", result[0].token);

      setUserInfo({
        id: result[0].id,
        name: `${result[0].firstName} ${result[0].lastName}`,
        email: result[0].email,
        points: result[0].points,
        bookingStatus: result[0].bookingStatus,
      });
    } catch (error) {
      console.error(error);
      setPopupMsg("Error logging in. Please try again.");
      setShowPopup(true);
      setMsgType("error-msg");
      setPending(false);
    }
  }

  return (
    <>
      <div className="sign-up-container">
        <h1>Please fill out the fields below to Log into your account.</h1>

        <form className="sign-up-form" onSubmit={formik.handleSubmit}>
          {loginForm.map((field, index) => (
            <InputField
              key={index}
              name={field.name}
              placeholder={field.placeholder}
              value={formik.values[field.name]}
              type={field.type}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              touched={formik.touched[field.name]}
              error={formik.errors[field.name]}
            />
          ))}

          <div className="submit-button-container">
            <button
              type="submit"
              className="submit-btn"
              disabled={!formik.isValid || !formik.dirty}
            >
              {pending ? "Logging In..." : "Log In"}
            </button>{" "}
            <button
              type="button"
              className="reset-btn"
              onClick={formik.handleReset}
            >
              Reset
            </button>
          </div>
        </form>
        <p>
          Don't have account yet? <Link to="/sign-up"> Sign Up</Link>
        </p>
      </div>

      {showPopup && (
        <Popup
          msg={popupMsg}
          showPopup={() => setShowPopup(!showPopup)}
          class_={msgType}
        />
      )}

      {pending && <LoadingSpinner />}

      <BackButton path="/" text="Back to Homepage" />
      <Footer />
    </>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./input-field";
import { loginForm } from "../data";
import { useFormik } from "formik";
import loginSchema from "../login-schema";
import BackButton from "./back-btn";
import Popup from "./popup";
import LoadingSpinner from "./loading";

function Login(props) {
  //const [clicked, setClicked] = useState(false);
  const [pending, setPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
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

      setPopupMsg("Log In Successful! Redirecting to home page...");
      setMsgType("success-msg");
      setTimeout(() => navigate("/"), 3000);
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
            <button type="submit" className="submit-btn">
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
      </div>

      {showPopup && (
        <Popup
          msg={popupMsg}
          showPopup={() => setShowPopup(!showPopup)}
          class_={msgType}
        />
      )}

      {pending && <LoadingSpinner />}

      <BackButton />
    </>
  );
}

export default Login;

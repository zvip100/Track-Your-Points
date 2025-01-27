import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import signUpSchema from "../sign-up-schema.js";
import { signUpForm } from "../data.js";
import InputField from "./input-field.jsx";
import Popup from "./popup.jsx";
import BackButton from "./back-btn.jsx";
import LoadingSpinner from "./loading.jsx";
import "../styles/sign-up.css";

function Signup() {
  const [pending, setPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: handleSignUp,
  });

  async function handleSignUp(values, { resetForm }) {
    setPending(true);
    try {
      const response = await fetch("http://localhost:3000/sign-up", {
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

      if (result === "Email in use") {
        setPopupMsg(
          "Email address already in use. Please try again with an different email address."
        );
        setMsgType("error-msg");
        return;
      }

      setPopupMsg("Sign Up Successful!");
      setMsgType("success-msg");
      setTimeout(() => navigate("/"), 3000);
    } catch (e) {
      console.error("Error creating acount: ", e);
      setPopupMsg("Error creating account. Please try again.");
      setMsgType("error-msg");
      setShowPopup(true);
      setPending(false);
      resetForm();
    }
  }

  if (showPopup) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  return (
    <>
      <div className="sign-up-container">
        <h1>Please fill out the fields below to create your account.</h1>

        <p className="sign-up-info">
          <strong>Important</strong>: Please use the same Email Address you're
          using at "Starlife Partners Agency". Otherwise your account will not
          be created.
        </p>

        <form className="sign-up-form" onSubmit={formik.handleSubmit}>
          {signUpForm.map((field, index) => (
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
              Sign Up
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
          showPopup={() => setShowPopup(false)}
          class_={msgType}
        />
      )}

      {pending && <LoadingSpinner />}

      <BackButton />
    </>
  );
}

export default Signup;

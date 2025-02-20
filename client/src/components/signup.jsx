import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import signUpSchema from "../sign-up-schema.js";
import { signUpForm } from "../data.js";
import InputField from "./input-field.jsx";
import Popup from "./popup.jsx";
import BackButton from "./back-btn.jsx";
import LoadingSpinner from "./loading.jsx";
import Footer from "./footer.jsx";
import { URL } from "../main";
import SignUpOtp from "./signup-otp.jsx";
import { scrollToTop, changeTitle } from "../helpers/utils";
import { verifyEmail, getOtp } from "../helpers/sign-up.js";
import "../styles/sign-up.css";

function Signup({ title }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [askOtp, setAskOtp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
    changeTitle(title);
  }, []);

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
    setEmail(values.email.toLowerCase());
    setPassword(values.password);

    const verifyEmailResult = await verifyEmail(values.email.toLowerCase());

    resetForm();

    if (verifyEmailResult?.error) {
      setPending(false);
      setShowPopup(true);
      setMsgType("error-msg");

      if (verifyEmailResult?.error === "user not found") {
        setPopupMsg(
          "Invalid Email Address. Please use your Starlife Partners Agency Email Address."
        );
      } else {
        setPopupMsg("Failed to verify your email address. Please try again.");
      }
      return;
    }

    const getOtpResult = await getOtp(values.email.toLowerCase());
    console.log("Get otp result: ", getOtpResult);

    setPending(false);
    setShowPopup(true);

    if (getOtpResult?.error) {
      setPopupMsg("Something went wrong. Please try again");
      setMsgType("error-msg");
      return;
    }

    setPopupMsg(
      `We sent a temporary code to ${values.email.toLowerCase()}. Please use this code to verify your email address.`
    );
    setMsgType("success-msg");
    setAskOtp(true);
  }

  if (showPopup) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  return (
    <>
      <div className="sign-up-container">
        {signUpSuccess ? (
          <Link to="/login">
            <button type="button">Log In</button>
          </Link>
        ) : (
          <>
            {askOtp ? (
              <SignUpOtp
                setSignUpSuccess={setSignUpSuccess}
                email={email}
                password={password}
                setShowPopup={setShowPopup}
                setPopupMsg={setPopupMsg}
                setMsgType={setMsgType}
                pending={pending}
                setPending={setPending}
              />
            ) : (
              <>
                <h1>
                  Please fill out the fields below to create your account.
                </h1>
                <p className="sign-up-info">
                  <strong>Important</strong>: Please use the same Email Address
                  you're using at "Starlife Partners Agency". Otherwise your
                  account will not be created.
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
                      {pending ? "Creating Your Account..." : "Sign Up"}
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
                  Already have an account? <Link to="/login">Log In</Link>
                </p>{" "}
              </>
            )}
          </>
        )}
      </div>

      {showPopup && (
        <Popup
          msg={popupMsg}
          showPopup={() => setShowPopup(false)}
          class_={msgType}
        />
      )}

      {pending && <LoadingSpinner />}

      <BackButton path="/" text="Back to Homepage" />
      <Footer />
    </>
  );
}

export default Signup;

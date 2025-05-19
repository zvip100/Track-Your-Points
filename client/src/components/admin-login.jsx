import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginForm } from "../helpers/forms";
import loginSchema from "../helpers/login-schema";
import InputField from "./input-field";
import { useFormik } from "formik";
import Popup from "./popup";
import LoadingSpinner from "./loading";
import BackButton from "./back-btn";
import Footer from "./footer";
import { URL } from "../main";
import { scrollToTop, changeTitle } from "../helpers/utils";

function AdminLogin({ setAdminInfo, title }) {
  const [pending, setPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state;

  useEffect(() => {
    scrollToTop();
    changeTitle(title);

    let timeoutId;

    if (loggedIn) {
      let page;

      if (state === "upload-users") page = "/admin/upload-users";
      else if (state === "add-user") page = "/admin/add-user";
      else if (state === "all-users") page = "/admin/all-users";
      else if (state === "points-history") page = "/admin/points-history";
      else if (state === "all-bookings") page = "/admin/all-bookings";
      else page = "/admin";

      timeoutId = setTimeout(() => navigate(page), 3000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loggedIn]);

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
      const response = await fetch(`${URL}/api/admin-auth/login`, {
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

      if (result === "Not found") {
        setPopupMsg(
          "Not found. Please try again with your correct information."
        );
        setMsgType("error-msg");
        return;
      }

      setPopupMsg(`Hello ${result[0]?.email}! You Have Admin status.`);
      setMsgType("success-msg");
      setLoggedIn(true);

      sessionStorage.setItem("admin-token", result[0]?.token);
      setAdminInfo(result[0]?.email);
    } catch (error) {
      console.error(error);
      resetForm();
      setPopupMsg("Error logging in. Please try again.");
      setShowPopup(true);
      setMsgType("error-msg");
      setPending(false);
    }
  }

  return (
    <>
      <div className="sign-up-container">
        <h1>Fill out the fields below to Log in as a Admin.</h1>

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
      </div>

      {showPopup && (
        <Popup
          msg={popupMsg}
          showPopup={() => setShowPopup(!showPopup)}
          class_={msgType}
        />
      )}

      {pending && <LoadingSpinner />}

      <BackButton path="/admin" text="Back to Admin page" />
      <Footer />
    </>
  );
}

export default AdminLogin;

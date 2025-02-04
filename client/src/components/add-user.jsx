import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import addUserSchema from "../add-user-schema";
import "../styles/add-user.css";
import Popup from "./popup";
import BackButton from "./back-btn";
import LoadingSpinner from "./loading";
import Footer from "./footer";
import { URL } from "../main";
import { AdminContext } from "./App";

function AddUser() {
  const [pending, setPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const navigate = useNavigate();
  const admin = useContext(AdminContext);

  useEffect(() => {
    if (!admin) navigate("/admin/login", { state: "add-user" });
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: addUserSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values, { resetForm }) {
    setPending(true);
    try {
      const response = await fetch(`${URL}/api/admin/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          },
        ]),
      });
      const result = await response.json();
      console.log(result);

      setShowPopup(true);
      resetForm();
      setPending(false);

      if (result === "already added") {
        setMsg("Users already added to database!");
        setMsgType("error-msg");
        return;
      }

      setMsg("User added successfully!");
      setMsgType("success-msg");
    } catch (e) {
      console.error("Error adding user!");
      setShowPopup(true);
      setMsg("Error adding user. Please try again.");
      setMsgType("error-msg");
      setPending(false);
      resetForm();
    }
  }

  return (
    <>
      <div className="add-user-container">
        <h1>~Add User~</h1>

        <form className="add-user-form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={formik.values.firstName}
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.firstName && formik.errors.firstName && (
            <p className="err-msg">{formik.errors.firstName} </p>
          )}

          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="err-msg">{formik.errors.lastName} </p>
          )}

          <input
            type="text"
            placeholder="Email Address"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.email && formik.errors.email && (
            <p className="err-msg">{formik.errors.email} </p>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={!formik.isValid || !formik.dirty}
          >
            Add User
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={formik.handleReset}
          >
            Reset
          </button>
        </form>
      </div>

      {showPopup && (
        <Popup
          msg={msg}
          showPopup={() => setShowPopup(false)}
          class_={msgType}
        />
      )}

      {pending && <LoadingSpinner />}

      <BackButton path="/admin" text="Back to Admin page" />
      <Footer />
    </>
  );
}

export default AddUser;

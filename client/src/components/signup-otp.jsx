import { useState } from "react";
import { verifyOtp, createAccount } from "../helpers/sign-up";

function SignUpOtp({
  setSignUpSuccess,
  email,
  password,
  setShowPopup,
  setPopupMsg,
  setMsgType,
  pending,
  setPending,
}) {
  const [otp, setOtp] = useState("");

  async function handleClick() {
    if (otp.length < 6) return;

    setPending(true);

    const verifyOtpResult = await verifyOtp(email, otp);

    if (verifyOtpResult?.error) {
      setPending(false);
      setShowPopup(true);
      setMsgType("error-msg");
      setOtp("");

      if (verifyOtpResult?.error === "Invalid OTP") {
        setPopupMsg("Invalid code!");
      } else {
        setPopupMsg("Something went wrong. Please try again");
      }
      return;
    }

    const createAccountResult = await createAccount(email, password);

    setPending(false);
    setOtp("");
    setShowPopup(true);

    if (createAccountResult?.error) {
      setPopupMsg("Failed to create your account. Please try again.");
      setMsgType("error-msg");
      return;
    }

    setSignUpSuccess(true);
    setPopupMsg("Account created successfully!");
    setMsgType("success-msg");
  }

  return (
    <>
      <div className="sign-up-form">
        <h1>Enter the code sent to your email</h1>
        <div className="input-container">
          <input
            type="number"
            placeholder="Enter code..."
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            autoFocus
          ></input>
        </div>

        <div className="submit-button-container">
          <button type="button" className="submit-btn" onClick={handleClick}>
            {pending ? "Submitting" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUpOtp;

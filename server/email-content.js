export function otpEmail(otp) {
  return {
    subject: "Please Verify Your Email Address",
    content: `<h1>Hello!</h1>
   <h3>Use the following code to verify your email address in order to create your account:</h3>
   <h3>${otp}</h3>`,
  };
}

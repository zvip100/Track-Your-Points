export function otpEmail(otp) {
  return {
    subject: "Please Verify Your Email Address",
    content: `<h1>Hello!</h1>
   <h3>Use the following code to verify your email address in order to create your account:</h3>
   <h3>${otp}</h3>`,
  };
}

export function bookingReqEmail(name, email, checkIn, checkOut) {
  return {
    subject: "New Booking Request from StarLife Vacation",
    content: `<h3>Hi,</h3>
    <h3>We got a new booking request for "Fountainview Villa" as following:</h3>
    <ul>
      <li>Name: ${name},</li>
      <li>Email Address: ${email},</li>
      <li>Check In: ${checkIn},</li>
      <li>Check Out: ${checkOut}.</li>
    </ul>
    <p>Please let us know if you were able to confirm this booking, otherwise we will ask our user to request again with alternative days.</p>
    <p>Thank you.</p>
    `,
  };
}

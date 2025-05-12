export default function otpEmail(otp) {
  return {
    subject: "Please Verify Your Email Address",
    content: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Email Verification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 0; text-align: center; background-color: #ffffff;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #0284c7; margin-bottom: 30px; font-size: 28px;">Email Verification</h1>
                  <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                    Please use the following code to verify your email address:
                  </p>
                  <div style="background-color: #f0f9ff; border: 2px solid #0284c7; border-radius: 8px; padding: 20px; margin: 30px 0;">
                    <h2 style="color: #0284c7; font-size: 32px; margin: 0;">${otp}</h2>
                  </div>
                  <p style="color: #718096; font-size: 14px; margin-top: 30px;">
                    If you didn't request this verification, please ignore this email.
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </body>
      </html>
      `,
  };
}

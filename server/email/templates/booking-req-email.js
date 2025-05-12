export default function bookingReqEmail(name, email, checkIn, checkOut) {
  return {
    subject: "New Booking Request from StarLife Vacation",
    content: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Booking Request</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 0; text-align: center; background-color: #ffffff;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #0284c7; margin-bottom: 30px; font-size: 28px;">New Booking Request</h1>
                  <div style="text-align: left; background-color: #f8fafc; border-radius: 8px; padding: 25px; margin: 20px 0;">
                    <h2 style="color: #334155; font-size: 20px; margin-bottom: 20px;">Booking Details:</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 10px 0; color: #64748b; width: 140px;">Guest Name:</td>
                        <td style="padding: 10px 0; color: #334155;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #64748b;">Email:</td>
                        <td style="padding: 10px 0; color: #334155;">${email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #64748b;">Check In:</td>
                        <td style="padding: 10px 0; color: #334155;">${checkIn}</td>
                      </tr>
                       <tr>
                        <td style="padding: 10px 0; color: #64748b;">Check Out:</td>
                        <td style="padding: 10px 0; color: #334155;">${checkOut}</td>
                      </tr>
                    </table>
                  </div>
                  <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin: 30px 0; text-align: left;">
                    Please review and confirm this booking request. If the dates are not available, let us know and we will ask the guest to select alternative dates.
                  </p>
                  <p style="color: #718096; font-size: 14px; margin-top: 30px; text-align: left;">
                    Thank you.
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

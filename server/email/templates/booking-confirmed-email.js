export default function bookingConfirmedEmail(
  name,
  checkIn,
  checkOut,
  infoUrl
) {
  return {
    subject: "Your Booking at StarLife Vacation is Confirmed!",
    content: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Booking Confirmation</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 40px 0; text-align: center; background-color: #ffffff;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <!-- Success Banner -->
                    <div style="background-color: #ecfdf5; border-radius: 8px; padding: 15px; margin-bottom: 30px;">
                      <h2 style="color: #059669; margin: 0; font-size: 20px;">✓ Booking Confirmed!</h2>
                    </div>
  
                    <h1 style="color: #0284c7; margin-bottom: 30px; font-size: 28px;">Hello ${name}!</h1>
                    
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin-bottom: 30px; text-align: left;">
                      Great news! Your booking request for our villa has been confirmed. We're excited to host you!
                    </p>
  
                    <!-- Booking Details Card -->
                    <div style="text-align: left; background-color: #f8fafc; border-radius: 8px; padding: 25px; margin: 20px 0;">
                      <h2 style="color: #334155; font-size: 20px; margin-bottom: 20px;">Stay Details:</h2>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 10px 0; color: #64748b; width: 140px;">Check In:</td>
                          <td style="padding: 10px 0; color: #334155;">${checkIn}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #64748b;">Check Out:</td>
                          <td style="padding: 10px 0; color: #334155;">${checkOut}</td>
                        </tr>
                      </table>
                    </div>
  
                    <div style="margin: 30px 0;">
                      <a href="${infoUrl}" 
                         style="display: inline-block; background: #0284c7; color: white; padding: 12px 24px; 
                                text-decoration: none; border-radius: 6px; font-weight: 500;">
                        View Details
                      </a>
                    </div>
  
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin: 30px 0; text-align: left;">
                      You will receive a separate email from Wave Kosher Villas with additional information about 
                      your stay, including the villa address and access instructions.
                    </p>
  
                    <p style="color: #718096; font-size: 14px; margin-top: 30px; text-align: left;">
                      We look forward to hosting you!<br>
                      StarLife Vacation Team
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

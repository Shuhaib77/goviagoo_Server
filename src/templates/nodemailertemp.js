export const registertemplate=(otp)=>
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
      .email-container { max-width: 600px; margin: 50px auto; background: #ffffff; border-radius: 8px; }
      .header { background-color: #4CAF50; color: #ffffff; text-align: center; padding: 20px; }
      .content { padding: 20px; text-align: center; }
      .otp-code { font-size: 32px; font-weight: bold; color: #4CAF50; padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; }
      .footer { font-size: 12px; color: #777; text-align: center; padding: 10px; background-color: #f4f4f4; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Your OTP Code</h1>
      </div>
      <div class="content">
        <p>Thank you for registering! Use the OTP below to complete your verification:</p>
        <div class="otp-code">${otp}</div>
        <p>This OTP is valid for 5 minutes. If you didn’t request this, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>`


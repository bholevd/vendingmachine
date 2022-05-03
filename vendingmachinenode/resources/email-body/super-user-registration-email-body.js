exports.superUserRegistrationEmailBodyu = (data) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: sans-serif; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Fulcrum Covid Care</title>
            </head>
            
            <body>
                <p>Hello ${data.FirstName} ${data.LastName},</p>
                <p><b>Thank you! You are registered successfully with Fulcrum Codiv Care.</b></p>
                <p>Please login with the below credentials: </p>
                <p><b>Employee-Id:</b> ${data.EmployeeId}</p>
                <p><b>Password:</b> ${data.Password}</p>
                <p><b>Thanks and Regards,</b></p>
                <p>Fulcrum Covid Care</p>
            </body>
        
        </html>`;
};

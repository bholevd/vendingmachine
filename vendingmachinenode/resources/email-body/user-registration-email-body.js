exports.expertRegisterEmail = (data) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: sans-serif; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email from Fulcrum Covid Care</title>
            </head>
            
            <body>
                <p>Hello ${data.FirstName} ${data.LastName},</p>
                <p><b>Thank you! your registration has beed done successfully!</b></p>
                <p>Employee-Id: ${data.EmployeeId}</p>
                <p>Email-Id: ${data.EmailId}</p><br />
                <p><b>Verify your account with OTP<b></p>
                <p>your Otp is: ${data.Otp}</p><br /><br />
                <p>Thanks</p>
                <p>Fulcrum Covid Care</p>
            </body>
        
        </html>`;
};

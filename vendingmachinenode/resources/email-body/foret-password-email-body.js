exports.forgotPasswordEmailBody = (data) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: sans-serif; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Recovery mail from Fulcrum Covid Care</title>
            </head>
            
            <body>
                <p>Hello ${data.FirstName} ${data.LastName},</p>
                <p><b>Your password is recovered successfully! Login with below credentails:</b></p>
                <p><b>Employee-Id:</b> ${data.EmployeeId}</p>
                <p><b>Password:</b> ${data.Password}</p>
                <p>Thanks</p>
                <p>Fulcrum Covid Care</p>
            </body>
        
        </html>`;
};

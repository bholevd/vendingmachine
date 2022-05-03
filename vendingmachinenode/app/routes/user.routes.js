const { isAuthenticated } = require('../../auth/authorization.js');

module.exports = (app) => {
    const users = require("../controllers/user.controller.js");

    // Create a new user
    app.post("/createNewUser", users.create);

    // Update a user with  Employee Id
    app.put("/user/:empId", users.update);

    // Get a user with Employee Id
    app.get("/user/:empId", users.getUserByEmployeeId);

    // Resend OTP
    app.get("/resendOtp", users.resendOtp);

    // Verify OTP
    app.post("/verifyOtp", users.verifyOtp);

    // Update devicetoken by Employee Id
    app.post("/user/updateDeviceToken", users.updateDeviceToken);

};

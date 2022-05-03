const User = require("../models/user.model.js");
const { isEmail, isPhoneNumber } = require("../../lib/validators.js");
const { sendMail } = require('../../services/EmailService');
const { messages } = require('../../resources/messages');
const { statusCodes, adAccountDetails } = require('../../config/constants');
const { expertRegisterEmail } = require('../../resources/email-body/user-registration-email-body');
const { errorModel } = require('../../lib/response');
const { generateOpt } = require('../../config/common');
var store = require('store');
var ActiveDirectory = require('activedirectory');

const config = {
    url: adAccountDetails.ldapUrl,
    baseDN: adAccountDetails.baseDN,
    username: adAccountDetails.UpnCovidKonnect,
    password: adAccountDetails.password
}


/**
 * Function is used for create user if deviceId does not exist
 * @access private
 * @return json
 * req.body  object which contains the following parameter
 * deviceId, sharePresence, deviceToken, city, cityLatitude, cityLongitude, language, notificationStatus
 * Created by Vishal Bhole
 * @Fulcrum Digital Pvt. Ltd.
 * Created Date 25-March-2020
 */
exports.create = (req, res) => {
    // console.log("req body", req.body);
    // Validate request
    if (!req.body) {
        return res.status(statusCodes.validation).send({
            message: "Content can not be empty!",
        });
    }

    if ( !req.body.emailAddress || !req.body.logInPassword) {
        return res.status(statusCodes.validation).send({
            message: "Required params can not be empty!",
        });
    }

    // if (!isEmail(req.body.emailId)) {
    //     return res.status(statusCodes.validation).send({
    //         message: "Email id is not valid!",
    //     });
    // }
    
    
    // else {
    //     var email_id = req.body.emailId.split('@');
    //     console.log("email id first characters", email_id[0]);

    //     if (!email_id.startsWith('FFD') || !email_id.startsWith('FWIN') || !email_id.startsWith('FL')) {
    //         return res.status(400).send({
    //             message: "Email id is not valid!",
    //         });
    //     }
    // }

    // Create User Constant
    const user = new User({
        employeeid: req.body.emailAddress
    });

    var ad = new ActiveDirectory(config);
    ad.authenticate(req.body.emailAddress, req.body.logInPassword, function(authErr, auth) {
        if (authErr) {
            console.log('ERROR: '+JSON.stringify(authErr));
            return res.status(statusCodes.validation).send({
                status: statusCodes.validation,
                message: "Oops ! Invalid Credentials !"
            });
        }
        
        if (auth) {
            console.log('Authenticated!');
            User.findByEmployeeId(user, (error, result) => {
                if (error) {
                    if (error.kind === "not_found") {
                        // Add New User in the database
                        User.create(user, async (err, resp) => {
                            if (err) {
                                res.status(statusCodes.internalServerError).send({
                                    status: statusCodes.internalServerError,
                                    message:
                                        err.message || "Some error occurred while creating the User.",
                                });
                            } else {
                                let data = {};
                                data['status'] = statusCodes.ok;
                                data['message'] = "Registered user successfully!"
                                data['data'] = resp;
                                return res.json(data);
                            }
                        });
                    }
                } else {
                    // Update User record in the database
                    let data = {};
                    data['status'] = statusCodes.ok;
                    data['message'] = "Logged in successfully!"
                    data['data'] = result;
                    return res.json(data);
                }
            });
        } else {
            console.log('Authentication failed!');
            let response = {};
            response['status'] = statusCodes.validation;
            response['message'] = "Authentication failed! You dont have access of this app please connect with HR!";
            return res.json(response)
        }
    });    
};

/**
 * Function is used for update user info
 * @access private
 * @return json
 * req.body  object which contains the following parameter
 * sharePresence, language, notificationStatus, deviceId
 * Created by Vishal Bhole
 * @Fulcrum Digital Pvt. Ltd.
 * Created Date 26-March-2020
 */
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Previous working code (for required parameters)
    // if (!req.params.empId && (req.body.firstName || req.body.lastName || req.body.emailId || req.body.mobileNo ||
    //     req.body.sharePresence || req.body.notificationStatus || req.body.language)) {
    //     res.status(400).send({
    //         message: "Required params can not be empty!",
    //     });
    //     return;
    // }

    // if (!isEmail(req.body.emailId)) {
    //     return res.status(400).send({
    //         message: "Email id is not valid!",
    //     });
    // }

    // if (!isPhoneNumber(req.body.mobileNo)) {
    //     return res.status(400).send({
    //         message: "Mobile number is not valid!",
    //     });
    // }

    // New changed code (working for required parameters)
    if (!req.params.empId && (req.body.sharePresence || req.body.notificationStatus || req.body.language)) {
        res.status(400).send({
            message: "Required params can not be empty!",
        });
        return;
    }

    // let UpdateData = {
    //     FirstName: req.body.firstName,
    //     LastName: req.body.lastName,
    //     EmailId: req.body.emailId,
    //     MobileNo: req.body.mobileNo,
    //     SharePresence: req.body.sharePresence,
    //     NotificationStatus: req.body.notificationStatus,
    //     Language: req.body.language,
    //     DeviceToken: req.body.deviceToken,
    // };


    let UpdateData = {
        SharePresence: req.body.sharePresence,
        NotificationStatus: req.body.notificationStatus,
        Language: req.body.language
    };

    User.updateByEmployeeId(req.params.empId, UpdateData, (err, data) => {
        if (data !== null) {
            data['EmployeeId'] = req.params.empId;
        }
        if (err) {
            if (err.kind === "not_found") {
                res.status(200).send({
                    message: `Does not found user with this employee id ${req.params.empId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error while updating User with this employee id " + req.params.empId,
                });
            }
        } else res.send(data);
    });
};

/**
 * Function is used for update device token
 * @access private
 * @return json
 * req.body  object which contains the following parameter
 * deviceToken
 * Created by Vishal Bhole
 * @Fulcrum Digital Pvt. Ltd.
 * Created Date 29-March-2020
 */
exports.updateDeviceToken = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    if (!req.body.employeeId || !req.body.deviceToken) {
        res.status(400).send({
            message: "Required params cannot be empty",
        });
        return;
    }

    User.updateDeviceTokenByEmployeeId(
        req.body.employeeId,
        req.body.deviceToken,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(200).send({
                        message: `Does not found user with this employee id ${req.body.employeeId}.`,
                    });
                } else {
                    res.status(500).send({
                        message:
                            "Error while updating user device token with this employee id " + req.body.employeeId,
                    });
                }
            } else res.send(data);
        }
    );
};

/**
 * Function is used for get user info by employeeId
 * @access private
 * @return json
 * req.params  object which contains the following parameter
 * deviceId
 * Created by Vishal Bhole
 * @Fulcrum Digital Pvt. Ltd.
 * Created Date 31-March-2020
 */
exports.getUserByEmployeeId = (req, res) => {
    User.findByEmployeeId(req.params.empId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(200).send({
                    message: `Does not found user with this employee id ${req.params.empId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving user with this employee id " + req.params.empId,
                });
            }
        } else res.send(data);
    });
};

exports.resendOtp = async (req, res) => {
    const currentUser = await store.get('currentRegisteredUser');
    User.resendOtp(currentUser, (err, result)=> {
        if (err) {
            res.status(500).send({
                error: err.error
            });
        } else {
            res.send(result.data);
        }
    });
}

exports.verifyOtp = (req, res) => {
    if (!req.body.otp) {
        return res.status(400).send({
            message: "required parameter is empty required Otp.",
        });
    }

    User.verifyOtp(req.body, (err, result)=> {
        if (err) {
            res.status(500).send({
                error: err.error
            });
        } else {
            res.send(result);
        }
    });
}

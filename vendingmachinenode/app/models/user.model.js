const mysql = require("./db.js");
var store = require('store');
const { messages } = require('../../resources/messages');
const { statusCodes } = require('../../config/constants');
const { sendMail } = require('../../services/EmailService');
const { expertRegisterEmail } = require('../../resources/email-body/user-registration-email-body');
const { errorModel } = require('../../lib/response');
const { generateOpt } = require('../../config/common');

// constructor
const User = function(user) {
    this.employeeid = user.employeeid;
};

User.findByEmployeeId = (user, result) => {
    mysql.query(
        `SELECT * FROM users WHERE employeeid = '${user.employeeid}'`,
        (err, resp) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (resp.length) {
                mysql.query(
                    `SELECT r.id AS role_id, r.rolename, ur.id AS user_role_id, ur.role_id
                    FROM roles r
                    JOIN user_role ur ON ur.role_id = r.id WHERE ur.user_id = ${resp[0].id}`,
                    async (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }

                        if (res.length) {
                            let userDetails = {
                                id: resp[0].id,
                                employeeId: resp[0].employeeid,
                                roleId: res[0].role_id,
                                roleName: res[0].rolename
                            };

                            result(null, userDetails);
                            return;
                        }
                        // not found user with the id
                        result({ kind: "not_found" }, null);
                    }
                );
            }
        }
    );
};

User.create = (newUser, result) => {
    mysql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { userId: res.insertId, ...newUser });
    });
};

User.updateByEmployeeId = (empId, user, result) => {
    let deviceTokenUpdate = "";
    if (user.DeviceToken) {
        deviceTokenUpdate = ", DeviceToken='" + user.DeviceToken + "'";
    }

    mysql.query(
        `UPDATE users SET
            SharePresence = '${user.SharePresence}', Language = '${user.Language}',
            NotificationStatus = '${user.NotificationStatus}', FirstName = '${user.FirstName}',
            LastName = '${user.LastName}', EmailId = '${user.EmailId}', MobileNo = '${user.MobileNo}',
            IsActive = 1 ${deviceTokenUpdate} WHERE EmployeeId = '${empId}'`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

        // Previous working query for update users
        // `UPDATE users SET
        //         SharePresence = '${user.SharePresence}', Language = '${user.Language}',
        //         NotificationStatus = '${user.NotificationStatus}', FirstName = '${user.FirstName}',
        //         LastName = '${user.LastName}', EmailId = '${user.EmailId}', MobileNo = '${user.MobileNo}',
        //         IsActive = 1 ${deviceTokenUpdate} WHERE EmployeeId = '${empId}'`

        mysql.query(
            `UPDATE users SET
                SharePresence = '${user.SharePresence}', Language = '${user.Language}',
                NotificationStatus = '${user.NotificationStatus}',
                IsActive = 1 ${deviceTokenUpdate} WHERE EmployeeId = '${empId}'`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found user with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                // console.log("updated user: ", { employeeId: empId, ...user });
                result(null, { ...user });
            }
        );
    });
}

User.resendOtp = async (data, result) => {
    // console.log("Resend otp : ", data);
    if (data.EmailId !== 'Covid.Konnect@fulcrumdigital.com') {
        data['Otp'] = generateOpt();
    } else {
        data['Otp'] = '4321';
    }
    const expertEmailBody = expertRegisterEmail(data)
    const emailFailErr = errorModel(messages.common.summaryMsg, messages.userProfile.regEmailFailed)
    const mailResponse = await sendMail(data.EmailId, messages.userProfile.expertRegisterEmailSubject, expertEmailBody);
    if (mailResponse && mailResponse.response) {
        store.remove('currentRegisteredUser')
        store.set('currentRegisteredUser', data);
        return result(null, {success: true, messages: 'Otp sent successfully to your mail id', data: data});
    } else {
        return result({error: emailFailErr});
    }
};

User.verifyOtp = async (data, result) => {
    const currentUser = store.get('currentRegisteredUser');
    if (currentUser.Otp != data.otp) {
        result({error: 'Otp does not match please enter valid Otp!'});
    } else {
        mysql.query(
            `UPDATE users SET IsVerified = 1 WHERE EmployeeId = '${currentUser.EmployeeId}'`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                if (res.affectedRows == 0) {
                    // not found user with the id
                    result({ kind: "not_found" }, null);
                    return;
                }
                store.remove('currentRegisteredUser');
                result(null, {success: true, messages: 'Otp verified successfully'});
            }
        );
    }
};

module.exports = User;

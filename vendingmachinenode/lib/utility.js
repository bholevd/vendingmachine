"use strict";
/*
 * Utility - utility.js
 * Author: Fulcrum Digital
 * Date: 4th April 2020
 */

var FCM = require("fcm-node");
var serverKey = "AAAAGRyFBBM:APA91bH0SYfCC6XwSE0NAtMK9nsfYCao_P6NSV6OBWPw1o9g3kqEu8CUNh2ypOU07ec76X8SLCvB4pQeNpYFcatpgyCCBH5e58SWrq6bjXRARQFMJGYq5ZyAiuWGzKeDUs2MOoz9OD4q"; // put your server key here
var fcm = new FCM(serverKey);
var utility = {};

/**
 * Function is used for push notification
 * @access private
 * @return json
 * @input  object which contains the following parameter
 * title , message
 * @to     array which contains to ids if empty will treated as all
 * Created by Jagdish Thakre
 * @Fulcrum Digital Pvt. Ltd.
 * Created Date 4-April-2020
 */
utility.pushNotification = function(input, to) {
  return new Promise(function(resolve, reject) {
    try {
      var message = {
        //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        registration_ids: to,
        collapse_key: "covid-konnect",

        notification: {
          title: input.title,
          body: input.message
        }

        // data: {
        //   //you can send only notification or only data(or include both)
        //   my_key: "my value",
        //   my_another_key: "my another value"
        // }
      };
      fcm.send(message, function(err, response) {
        if (err) {
          console.log("Something has gone wrong!");
          reject({
            status: false,
            data: err
          });
        } else {
          console.log("Successfully sent with response: ", response);
          resolve({
              status: true,
              data: message
          })
        }
      });
    } catch (err) {
      reject({
        status: false,
        data: err
      });
    }
  });
};

module.exports = utility;

const Machine = require("../models/vendingmachinedata.model");
const { messages } = require('../../resources/messages');
const { statusCodes } = require('../../config/constants');
const { errorModel } = require('../../lib/response');

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
exports.getVendingMachineData = (req, res) => {
    Machine.findByEmployeeId((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(200).send({
                    message: `Does not found user with this employee id.`,
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving user with this employee id",
                });
            }
        } else res.send(data);
    });
};

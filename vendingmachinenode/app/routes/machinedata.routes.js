module.exports = (app) => {
    const machie = require("../controllers/vendingmachinedata.controller");

    // Get a user with Employee Id
    app.get("/getMachineData", machie.getVendingMachineData);
};

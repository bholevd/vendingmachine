module.exports = function (express) {
    const router = express.Router();
    // require("./routes/user.routes")(router);
    // require("./routes/machinedata.routes")(router);
    require("./routes/uploadfile.routes")(router);
    return router;
};

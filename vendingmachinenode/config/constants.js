//token expiration time
exports.tokenExpireIn = "24h";

//token secret key
exports.tokenSecretKey = "fdCovidCareSecretKey";

//Defining response codes
exports.statusCodes = {
    ok: 200,
    unAuth: 401,
    notFound: 404,
    validation: 400,
    failed: 1002,
    invalidURL: 1001,
    paymentReq: 402,
    internalError: 1004,
    forbidden: 403,
    internalServerError: 500,
    alreadyExist: 409, //conflict
};

// //mail configuration
// exports.mailer = {
//     service: "gmail",
//     port: 587,
//     username: "kaushalk1992@gmail.com",
//     password: "BholeV@90",
//     host: "smtp.gmail.com",
//     from: "kaushal kulkarni <kaushalk1992@gmail.com>",
// };

//mail configuration
exports.mailer = {
    service: "office365",
    port: 587,
    username: "Covid.Konnect@fulcrumdigital.com",
    password: "$RFV4rfv",
    host: "smtp.office365.com",
    from: "Covid Konnect <Covid.Konnect@fulcrumdigital.com>",
};

exports.adAccountDetails = {
    ldapUrl: "ldap://192.168.44.24",
    baseDN: "dc=fww,dc=com",
    UpnCovidKonnect: "covid.konnect@fulcrumdigital.com",
    password: "#EDC3edc"
}

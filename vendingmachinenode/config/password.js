const bcrypt = require("bcrypt");
const salt = 10

exports.encryptPwd = (pwd) => {
    const hash = bcrypt.hashSync(pwd, salt)
    return hash
}

exports.matchPwd = (currentPassword, dbPassword) => {
    const passwordFlag = bcrypt.compareSync(currentPassword, dbPassword);
    return passwordFlag;
}

exports.makePassword = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return "3" + result + "@";
}
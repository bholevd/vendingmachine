const { tokenSecretKey, tokenExpireIn } = require('../config/constants');
var jwt = require('jsonwebtoken');
const { jwt_decode } = require('jwt-decode');

//sign in auth token
exports.signInToken = (user) => {
    const jwtToken = jwt.sign({ user: user }, tokenSecretKey, { expiresIn: tokenExpireIn })
    return jwtToken
}

exports.getDecodedAccessToken = (token) => {
    try {
        return jwt_decode(token);
    } catch(Error){
        return null;
    }
}

/* @function : generate otp
 * @param    : Otp
 * @created  : 18 June 2020
 * @modified : 18 June 2020
 * @purpose  : To generate random otp
 * @return   : Status : true, false
 * @public
 */
exports.generateOpt = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

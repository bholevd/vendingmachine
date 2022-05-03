var jwt = require('jsonwebtoken');
const { tokenSecretKey, statusCodes } = require('../config/constants');
const { messages } = require('../resources/messages');
const { operationResult, errorModel } = require('../lib/response');

exports.isAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers
    const authError = await errorModel(messages.common.summaryMsg, messages.common.unAuth)
    const opResult = operationResult(false, authError, null)
    if (!authorization)
        return res.status(statusCodes.unAuth).send({
            status: statusCodes.forbidden,
            message: "Authorizations failed!"
        });

    if (!authorization.startsWith('Bearer'))
        return res.status(statusCodes.unAuth).send({
            status: statusCodes.forbidden,
            message: "Authorizations failed!"
        });

    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(statusCodes.unAuth).send({
            status: statusCodes.forbidden,
            message: "Authorizations failed!"
        });

    const token = split[1]

    try {
        const decodedToken = jwt.verify(token, tokenSecretKey).valueOf()
        res.locals = { ...res.locals, decodedToken }
        return next();
    } catch (err) {
        console.error(`${err.code} -  ${err.message}`)
        // const sessionError = await errorModel(messages.common.summaryMsg, messages.common.sessionExpired)
        // const sessionResult = operationResult(false, sessionError, null)
        return res.status(statusCodes.forbidden).send({
            status: statusCodes.forbidden,
            message: "Authorizations failed!"
        });
    }
}
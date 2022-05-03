/**
 * This file is meant for giving the custom response
 * Author: Fulcrum digital
 * Date: 09 April 2020
 * params @code | @message | @data
*/

exports.operationResult = (success, errorMessages, data) => {
    const date = new Date()
    const res = {
      operationId: date.getTime(),
      success: success,
      errorMessages: Array.isArray(errorMessages) ? errorMessages : (errorMessages !== null && Object.keys(errorMessages).length) ? [errorMessages] :  errorMessages,
      data: data
    };
    return res;
}
  
exports.errorModel = (propertyName, message) => {
    return {
        propertyName: propertyName,
        message: message
    }
}
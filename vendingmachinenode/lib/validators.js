/**
 * This file is meant for validation
 * Author: Fulcrum digital
 * Date: 18 June 2020
*/

/* @function : checkRequiredFields
 * @param    : Name
 * @created  : 13 April 2020
 * @modified : 13 April 2020
 * @purpose  : To check required fields in req
 * @return   : Array
 * @public
 */
// exports.checkRequiredFields = (fields, reqBody) => {
//     if (fields.length) {
//         const emptyFields = await findEmptyFields(fields, reqBody)
//         return emptyFields
//     } else {
//         return []
//     }
// }

/* @function : findEmptyFields
 * @param    : Name
 * @created  : 13 April 2020
 * @modified : 13 April 2020
 * @purpose  : To check empty fields in req
 * @return   : Array
 * @public
 */
// exports.findEmptyFields = (fields, reqBody) => {
//     const tempArr = []
//     // tslint:disable-next-line: prefer-for-of
//     for (let i = 0; i < fields.length; i++) {
//         if (!reqBody[fields[i]]) {
//             tempArr.push({
//                 propertyName: fields[i],
//                 message: requiredFieldsMsg.hasOwnProperty(fields[i]) ? requiredFieldsMsg[fields[i]] : requiredFieldsMsg["other"]
//             })
//         }
//     }
//     return tempArr
// }

/* @function : isEmail
* @param    : Email
* @created  : 18 June 2020
* @modified : 18 June 2020
* @purpose  : To validate email and return status
* @return   : Status : true, false
* @public
*/
exports.isEmail = (email) => {
    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email);
}

/* @function : isPhoneNumber
 * @param    : Phone Number
 * @created  : 18 June 2020
 * @modified : 18 June 2020
 * @purpose  : To validate phone number and return status
 * @return   : Status : true, false
 * @public
 */
exports.isPhoneNumber = (phone) => {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone);
}
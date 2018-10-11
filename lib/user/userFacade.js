'use strict';

//========================== Load Modules Start =======================

//========================== Load external modules ====================
var promise = require("bluebird");
//========================== Load internal modules ====================
// Load user service
var _ = require("lodash");
const usrService = require('./userService');
const jwtHandler = require('../jwtHandler');
const AppUtil = require('../appUtils');
// const redisClient = require("../redisClient/init");
const customExceptions = require('../customExceptions');
const userMapper = require('./userMapper');
const admService = require('../admin/adminService');
const sendPass = require('../middleware').email

//========================== Load Modules End ==============================================

/**
 * @function signup
 * signup via email
 */
function signup(signupInfo) {
    console.log('signupinfo',signupInfo)
    return usrService.signupUser(signupInfo)
        .then((result) => {
            return result;
        });
}

/**
 * @function login
 * login via email
 * @param {Object} loginInfo login details
 */
function login(loginInfo) {
    console.log('login info',loginInfo)
    return usrService.isUserExist(loginInfo)
        .then(function (isExist) {
            if (isExist) {
                return AppUtil.verifyPassword(loginInfo, isExist).then(async (valid) => {
                    if (valid) {
                        if (isExist.userRole == 'ADMIN') {
                            return jwtHandler.genAdminToken({ name: isExist.fullName, userId: isExist._id, email_id: isExist.emailId }).then(async (jwt) => {
                                let exi = await sendPass.LOGIN(isExist.emailId, isExist);
                                return userMapper.loginMapping(isExist, jwt);
                            });
                        }
                        else {
                            return jwtHandler.genUsrToken({ name: isExist.fullName, userId: isExist._id, email_id: isExist.emailId }).then(async (jwt) => {
                                let exi = await sendPass.LOGIN(isExist.emailId, isExist);
                                return userMapper.loginMapping(isExist, jwt);
                            });
                        }

                    } else {
                        let exi = await sendPass.FAILLOGIN(isExist.emailId, isExist);
                        return userMapper.passwordMismatch();
                    }
                });
            } else {
                return userMapper.userNotExist();
            }
        });
}
function forgot_pass(emailId) {
    return usrService.forgot_password(emailId)
        .then((result) => {
            return result;
        });
}
function resetPass(obj, data) {
    return usrService.resetPass(obj, data).then((result) => result);
}

function getUser(id) {
    return usrService.getUser(id);
}

function editProfile(id, obj) {
    return usrService.editProfile(id, obj);
}

function uploadProfilePicture(req) {
    return usrService.uploadProfilePicture(req);
}



//========================== Export Module Start ==============================

module.exports = {
    signup,
    login,
    forgot_pass,
    resetPass,
    getUser,
    editProfile,
    uploadProfilePicture

};

//========================== Export Module End ===============================

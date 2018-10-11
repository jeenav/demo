'use strict';

//========================== Load Modules Start =======================
//========================== Load internal modules ====================
const promise = require("bluebird");
//========================== Load internal modules ====================

// Load user dao
var _ = require("lodash");
const userDao = require('./userDao');
const AppUtil = require('../appUtils');
const userMapper = require('./userMapper');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const adminDao = require('../admin/adminDao');
const sendPass = require('../middleware').email

//========================== Load Modules End ==============================================


function signupUser(usrDetails) {
    let emailId = usrDetails.emailId;
    return userDao.checkIfExist(emailId).then((exist) => {
        if (exist) {
            return userMapper.userExist();
        } else {
            let modifyed_result = userMapper.modifyed_create_request(usrDetails);
            return userDao.registerUser(modifyed_result).then(async (data) => {
                let exi = await sendPass.WELCOME(data.emailId, data);
                return userMapper.registerMapping(data._id);
            });
        }
    });
}
function isUserExist(details) {
    console.log('details',details)
    return userDao.checkIfExist(details.emailId)
        .then((result) => {
            return result;
        });
}

function forgot_password(emailId) {
    //console.log(email);
    return userDao.checkIfExist(emailId)
        .then((exist) => {
            if (exist) {
                return AppUtil.getRandomPassword()
                    .then((randomPassword) => {
                        return AppUtil.generateSaltAndHashForPassword(randomPassword.toString()).then((new_password) => {
                            return userDao.reset_password(emailId, new_password).then(async (updated_result) => {
                                let result = await send_mail(exist.fullName, emailId, randomPassword);
                                return userMapper.emailSent();
                            })
                        });
                    });
            }
            else {
                return userMapper.userNotExist();
            }
        })
}
async function send_mail(name, email, new_password) {
    return sendPass.FORGOTPASSWORD(email, { fullName: name, password: new_password })
        .then((data) => {
            return userMapper.emailSent();
        }).catch(e => userMapper.internalServerError());
}

function resetPass(id, obj) {
    return userDao.checkUser(id).then(function (data) {
        if (data) {
            return AppUtil.verifyPassword(obj, data).then(async (result) => {
                if (result) {
                    data.password = await AppUtil.generateSaltAndHashForPassword(obj.newPassword);
                    return userDao.saveChange(data).then(async function (end_result) {
                        let exi = await sendPass.RESETPASSWORDSUCCESS(data.emailId, data);
                        return userMapper.passChanged();
                    });
                }
                else {
                    let exi = await sendPass.RESETPASSWORDFAIL(data.emailId, data);
                    return userMapper.oldPasswordDiNotdMatch();
                }
            })
        } else {
            return userMapper.userNotExist()
        }
    })
}
function getUser(id) {
    return userDao.checkUser(id).then((data) => {
        if (data) {
            return userMapper.success(data);
        } else {
            return userMapper.userNotExist()
        }
    })
}
function editProfile(id, obj) {
    let allowedFields = userMapper.createAllowedFields(obj);

    return userDao.editProfile(id, allowedFields).then(function (data) {
        if (!data) {
            return userMapper.userNotExist()
        } else {
            return userMapper.success(data);
        }
    })
}
function uploadProfilePicture(req) {
    return userDao.uploadProfilePicture(req).then(function (data) {
        return userMapper.imageUploaded(data);
    }).catch((e) => {
        return userMapper.internalServerError()
    })
}


//========================== Export Module Start ==============================

module.exports = {
    signupUser,
    isUserExist,
    forgot_password,
    send_mail,
    resetPass,
    getUser,
    editProfile,
    uploadProfilePicture
    

};

//========================== Export Module End ===============================

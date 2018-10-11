/**
 * This file will have request and response object mappings.
 *
 */

var _ = require("lodash");
const contstants = require("../constants");
const config = require('../config');


function registerMapping(id) {
    var respObj = {
        "responseMessage": "Successfully registered.",
        "responseCode": 201,
        "userProfile": {
            id: id
        }
    };
    return respObj;
}
function userExist() {
    var respObj = {
        "responseMessage": "User already exist.",
        "responseCode": 400,
    }
    return respObj;
}
function loginMapping(user, jwt) {
    console.log(jwt)
    let { _id, fullName,  emailId } = user
    user = { _id, fullName,  emailId };
    console.log(user)
    var respObj = {
        "responseMessage": "Successfully Logged In.",
        "responseCode": 200,
        "userProfile": {
            user: user,
            jwt: jwt
        }
    };

    return respObj;
}

function passwordMismatch() {
    var respObj = {
        "responseMessage": "Incorrect Password.",
        "responseCode": 500
    }
    return respObj;
}
function userNotExist() {
    var respObj = {
        "responseMessage": "User Not Found",
        "responseCode": 404
    }
    return respObj;
}
function internalServerError() {
    var respObj = {
        "responseMessage": "Internal Server Error.",
        "responseCode": 500
    }
    return respObj;
}
function emailSent() {
    var respObj = {
        "responseMessage": "New password has been sent to your email account.",
        "responseCode": 200
    }
    return respObj;
}

function imageUploaded(data) {
    var respObj = {
        "responseMessage": "Image uploaded successfully..",
        "responseCode": 201,
        "url": data
    }
    return respObj;
}
function modifyed_create_request(data) {
    return {
        fullName,
        password,
        emailId,
        gender,
        imageUrl,
        imageId,
        userRole,
    } = data;

}

function passChanged() {
    var respObj = {
        "responseMessage": "Password has been successfully changed.",
        "responseCode": 200
    }
    return respObj;
}

function oldPasswordDiNotdMatch() {
    var respObj = {
        "responseMessage": "Old Password didn't match.Please try again later.",
        "responseCode": 400
    }
    return respObj;
}

function success(data) {
    let { fullName,
        emailId,
        gender,
        imageUrl,
        imageId
         } = data;
    let new_obj = {
        fullName,
        emailId,
        gender,
        imageUrl,
        imageId
        
    }
    var respObj = {
        "responseMessage": "Success.",
        "responseCode": 200,
        userProfile: new_obj
    }
    return respObj;
}

function createAllowedFields(data) {
    return {
        fullName,
        emailId,
        gender,
        imageUrl,
        imageId
        
    } = data;
}


function successMsg(obj) {
    let result;
    if (obj) {
        var { _id, isActive, content, name } = obj
        result = { _id, isActive, content, name }
    } else result = {}

    return {
        responseMessage: "Success",
        responseCode: 200,
        result
    }
}


async function modifyedObj(obj) {
    let result = await obj.filter((value) => value.isActive)
    return result;
}



function categoryNotFound() {
    return {
        responseMessage: "Category not found,Please check category id.",
        responseCode: 404
    }
}

module.exports = {
    registerMapping,
    userExist,
    loginMapping,
    passwordMismatch,
    userNotExist,
    internalServerError,
    emailSent,
    modifyed_create_request,
    passChanged,
    oldPasswordDiNotdMatch,
    success,
    createAllowedFields,
    imageUploaded,
    successMsg,
    modifyedObj,
    categoryNotFound,
    
};

/**
 * This file will have request and response object mappings.
 
 */

var _ = require("lodash");
const constants = require("../constants");
const config = require('../config');

function internalServerError() {
    var respObj = {
        "responseMessage": "Internal Server Error.",
        "responseCode": 500
    }
    return respObj;
}
function createSuccess() {
    var respObj = {
        "responseMessage": "Successfully  created.",
        "responseCode": 201,
    }
    return respObj
}

function editSuccess() {
    var respObj = {
        "responseMessage": "Successfully  Edited.",
        "responseCode": 200,
    }
    return respObj
}


function createBannerResponse(obj) {
    return { type, url, name, image } = obj;

}

function editBannerResponse(obj) {
    return { url, name, image } = obj;
}

function unAuthorized() {

    var respObj = {
        "responseMessage": "Unauthorized Access. Please provide a valid id",
        "responseCode": 403,
    }
    return respObj
}
function success() {
    var respObj = {
        "responseMessage": "Success",
        "responseCode": 200,
    }
    return respObj
}
function getSuccess(data) {
    var respObj = {
        "responseMessage": "Success",
        "responseCode": 200,
        data: data
    }
    return respObj
}

function getList(obj) {
    var respObj = {
        "responseMessage": "Successful",
        "responseCode": 200,
        LIST: obj
    }
    return respObj;
}
function createCategoryResponse(obj) {
    return { type, apiKey, apiSecret, url, name, image } = obj;

}
function editCategoryResponse(obj) {
    return { url, name, image, apiKey, apiSecret } = obj;
}
function deleted() {
    var respObj = {
        "responseMessage": "Deleted",
        "responseCode": 200,
    }
    return respObj
}





function alreadyExist() {
    return {
        "responseMessage": "Value with the same name exist.",
        "responseCode": 400
    }
}

function noExist() {
    return {
        "responseMessage": "Unable to find the record,Please check the id and try again.",
        "responseCode": 404
    }
}




module.exports = {


    internalServerError,

    createSuccess,

    createBannerResponse,

    editSuccess,

    editBannerResponse,

    unAuthorized,

    success,

    getList,

    createCategoryResponse,

    editCategoryResponse,

    deleted,

   

    alreadyExist,

    noExist,


    getSuccess,

   
};

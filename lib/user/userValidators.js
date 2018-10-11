//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");
//========================== Load Internal Module =========================
var appUtils = require("../appUtils");
var userConst = require("./userConstants");
var exceptions = require("../customExceptions");
var development = require("../config/env/development");
var jwtHandler = require('../jwtHandler');
let usrFacade = require('./userFacade')
//========================== Load Modules End =============================



//========================== Export Module Start ===========================





function register(req, res, next) {

    let { fullName, emailId, password} = req.body;
    let error = [];
    if (!fullName) {
        error.push({ code: userConst.CODE.INTRNLSRVR, message: userConst.MESSAGES.NAME_CANT_EMPTY })
    }
    else if (!emailId) {
        error.push({ code: userConst.CODE.INTRNLSRVR, message: userConst.MESSAGES.EmailCantEmpty })
    } else if (!password) {
        error.push({ code: userConst.CODE.INTRNLSRVR, message: userConst.MESSAGES.PWD_CANT_EMPTY })
    }
    else if (!appUtils.isValidEmail(emailId)) {
        error.push({ code: userConst.CODE.INTRNLSRVR, message: userConst.MESSAGES.InvalidEmail })
    }

    if (error.length > 0) {
        validationError(error, next);
    } else
        next();


}


var changeName = function (req, res, next) {

    req.body.fullName = req.body.firstName + ' ' + req.body.lastName || '';

    next();
};


var validateLogin = function (req, res, next) {


    var { emailId, password } = req.body;

    var errors = [];
    if (_.isEmpty(password)) {
        errors.push({ fieldName: "Password", message: userConst.MESSAGES.PWD_CANT_EMPTY });
    }
    email_id = req.body.emailId = _.toLower(emailId);
    if (_.isEmpty(emailId)) {
        errors.push({ fieldName: "email", message: userConst.MESSAGES.EmailCantEmpty });
    } else {
        if (!appUtils.isValidEmail(emailId)) {
            errors.push({ fieldName: "email", message: userConst.MESSAGES.InvalidEmail });
        }
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }

    next();
};

function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token)
        return res.json({ code: userConst.CODE.FRBDN, message: userConst.MESSAGES.TOKEN_NOT_PROVIDED });
    else {
        jwtHandler.verifyUsrToken(token).then((result) => {
            if (result) {
                next();
            } else {
                return res.json({ code: userConst.CODE.FRBDN, message: userConst.MESSAGES.TOKEN_INVALID });
            }
        }).catch((e) => res.json({ code: userConst.CODE.FRBDN, message: userConst.MESSAGES.InternalServerError }))
    }

}

var validateUserId = function (req, res, next) {

    var { invitedByUserId } = req.body;
    var errors = [];
    if (_.isEmpty(invitedByUserId)) {
        errors.push({ fieldName: "invitedByUserId", message: userConst.MESSAGES.UserIdCantEmpty });
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};
var validateUsersId = function (req, res, next) {

    var { userId } = req.body;
    var errors = [];
    if (_.isEmpty(userId)) {
        errors.push({ fieldName: "userId", message: userConst.MESSAGES.UserIdCantEmpty });
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};
var validateGetConnectionPageList = function (req, res, next) {

    var { pageNo, count } = req.params;
    if (pageNo) {
        pageNo = req.body.pageNo = parseInt(pageNo);
    }

    if (count) {
        count = req.body.count = parseInt(count);
    }
};


function checkPassMatch(req, res, next) {
    var errors = [];
    if (req.body.newPassword !== req.body.confirmPassword) {
        errors.push({ fieldName: "validation error", message: userConst.MESSAGES.validationError });
    } else if (!req.body.password) {
        errors.push({ fieldName: "Required Fields", message: userConst.MESSAGES.REQFIELDS });
    }

    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
}

function checkId(req, res, next) {
    let { id,userId } = req.params;
    let obj=req.body;
    let error = []
    if (!id) {
        error.push({ code: userConst.CODE.INTRNLSRVR, message: userConst.MESSAGES.FEEDBACK_ID_REQ })
    }else if(!userId){
        error.push({code:userConst.CODE.FRBDN, message:userConst.MESSAGES.TOKEN_INVALID})
    }else if(!obj.content.context){
        error.push({ fieldName: "Required Fields", message: userConst.MESSAGES.CONTENT_REQ })
    }
    if (error.length > 0) {
        validationError(error, next);
    } else
        next();
}


function checkValidToken(req, res) {
    var token = req.headers['authorization'];
    if (!token)
        return res.json({ code: userConst.CODE.FRBDN, message: userConst.MESSAGES.TOKEN_NOT_PROVIDED });
    else {
        jwtHandler.verifyUsrToken(token).then((result) => {
            if (result) {
                return res.json({ code: userConst.CODE.Success, message: userConst.MESSAGES.Valid });
            } else {
                jwtHandler.verifyAdminToken(token).then((data) => {
                    if (data) {
                        return res.json({ code: userConst.CODE.Success, message: userConst.MESSAGES.Valid });
                    } else
                        return res.json({ code: userConst.CODE.FRBDN, message: userConst.MESSAGES.TOKEN_INVALID });
                })
            }
        }).catch((e) => res.json({ code: userConst.CODE.FRBDN, message: userConst.MESSAGES.InternalServerError }))
    }
}



/**
 * handling validation errors
 */

var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(userConst.MESSAGES.validationError, errors));
    }
    next();
};

module.exports = {
    validateLogin,
    requiredCheck: register,
    changeName,
    validateUserId,
    validateGetConnectionPageList,
    validateUsersId,
    verifyToken,
    checkPassMatch,
    checkValidToken,
    checkId

};
//========================== Export module end ==================================

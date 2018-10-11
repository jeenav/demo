//========================== Load Modules Start ===========================
/**

 */
//========================== Load external Module =========================
var _ = require("lodash");
//========================== Load Internal Module =========================
var appUtils = require("../appUtils");
var adminConst = require("./adminConstants");
var exceptions = require("../customExceptions");
var jwtHandler = require('../jwtHandler');
var userValidators = require('../user/userValidators');
var usrFacade = require('../user/userFacade');
var constants = require('../constants')
//========================== Load Modules End =============================



//========================== Export Module Start ===========================


function verifyAdminToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        throw new exceptions.unauthorizeAccess(adminConst.MESSAGE.TOKEN_NOT_PROVIDED);
    } else {
        jwtHandler.verifyAdminToken(token).then((result) => {
            if (result) {
                next();
            } else {
                return next(exceptions.getCustomErrorException(adminConst.MESSAGE.validationError, adminConst.MESSAGE.INVALIDTOKEN));
            }
        })
    }
}
function verifyBannerToken(req, res, next) {
    console.log('request.headers',req.headers['authorization'])
    var token = req.headers['authorization'];
    console.log('token',token)
    if (!token) {
        throw new exceptions.unauthorizeAccess(adminConst.MESSAGE.TOKEN_NOT_PROVIDED);
    } else {
        jwtHandler.verifyAdminToken(token).then((result) => {
            if (result) {
                console.log('result.userId',result)
                console.log('paramsId',req.params.id)
                if (result.userId != req.params.id) {
                    var error = [];
                    error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
                    validationError(error, next);
                } else {
                    req.body.createdBy = req.params.id
                    req.body.editedBy = req.params.id;
                    req.body.type = adminConst.STATS.banner;
                    next();
                }
            } else {
                return next(exceptions.getCustomErrorException(adminConst.MESSAGE.validationError, adminConst.MESSAGE.INVALIDTOKEN));
            }
        })
    }
}


function verifyBannerToken_change(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        throw new exceptions.unauthorizeAccess(adminConst.MESSAGE.TOKEN_NOT_PROVIDED);
    } else {
        jwtHandler.verifyAdminToken(token).then((result) => {
            if (result) {
                console.log('result.userId',result)
                console.log('paramsId',req.params.adminId)
                if (result.userId != req.params.adminId) {
                    var error = [];
                    error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
                    validationError(error, next);
                } else {
                    // req.body.createdBy = req.params.adminId
                    req.body.editedBy = req.params.adminId;
                    // req.body.type = adminConst.STATS.banner;
                    next();
                }
            } else {
                return next(exceptions.getCustomErrorException(adminConst.MESSAGE.validationError, adminConst.MESSAGE.INVALIDTOKEN));
            }
        })
    }
}

function verifyCategoryToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        throw new exceptions.unauthorizeAccess(adminConst.MESSAGE.TOKEN_NOT_PROVIDED);
    } else {
        jwtHandler.verifyAdminToken(token).then((result) => {
            if (result) {
                if (result.userId != req.params.id) {
                    var error = [];
                    error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
                    validationError(error, next);
                } else {
                    req.body.createdBy = req.params.id
                    req.body.editedBy = req.params.id;
                    req.body.type = adminConst.STATS.category;
                    next();
                }
            } else {
                return next(exceptions.getCustomErrorException(adminConst.MESSAGE.validationError, adminConst.MESSAGE.INVALIDTOKEN));
            }
        })
    }
}


function verifyCategoryToken_check(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        throw new exceptions.unauthorizeAccess(adminConst.MESSAGE.TOKEN_NOT_PROVIDED);
    } else {
        jwtHandler.verifyAdminToken(token).then((result) => {
            if (result) {
                if (result.userId != req.params.adminId) {
                    var error = [];
                    error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
                    validationError(error, next);
                } else {
                    // req.body.createdBy = req.params.id
                    req.body.editedBy = req.params.adminId;
                    // req.body.type = adminConst.STATS.category;
                    next();
                }
            } else {
                return next(exceptions.getCustomErrorException(adminConst.MESSAGE.validationError, adminConst.MESSAGE.INVALIDTOKEN));
            }
        })
    }
}






function verifyAdminTokenUser(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        throw new exceptions.unauthorizeAccess(adminConst.MESSAGE.TOKEN_NOT_PROVIDED);
    } else {
        jwtHandler.verifyAdminToken(token).then((result) => {
            if (result) {
                if (result.userId != req.params.adminId) {
                    var error = [];
                    error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
                    validationError(error, next);
                } else {
                    next();
                }
            } else {
                return next(exceptions.getCustomErrorException(adminConst.MESSAGE.validationError, adminConst.MESSAGE.INVALIDTOKEN));
            }
        })
    }
}


function requiredCheck(req, res, next) {
    let { name, image } = req.body
    let error = []
    if (!name) {
        error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
    } else if (!image) {
        error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
    }
    if (error.length > 0) {
        validationError(error, next);
    } else
        next();
}
function checkEmail(req, res, next) {
    let { content } = req.body
    let error = []
    if (!content) {
        error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
    }
    if (error.length > 0) {
        validationError(error, next);
    } else
        next();
}
function categoryCheck(req, res, next) {
    let { name, apiKey, apiSecret, url } = req.body;
    let error = []
    if (!name) {
        error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
    }
    else if (!apiKey) {
        error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
    }
    else if (!apiSecret) {
        error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
    }
    else if (!url) {
        error.push({ responseCode: adminConst.CODE.INTRSRVR, responseMessaage: adminConst.MESSAGE.validationError })
    }
    if (error.length > 0) {
        validationError(error, next);
    } else
        next();
}

function userRequiredCheck(req, res, next) {
    userValidators.requiredCheck(req, res, next);
}




var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(adminConst.MESSAGE.validationError, errors));
    }
    next();
};

module.exports = {
    verifyBannerToken,

    verifyCategoryToken,

    requiredCheck,

    categoryCheck,

    checkEmail,

    verifyAdminToken,

    verifyBannerToken_change,

    verifyCategoryToken_check,

    userRequiredCheck,

    verifyAdminTokenUser,


    





    
};
//========================== Export module end ==================================

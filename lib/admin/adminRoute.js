const admRoutr = require("express").Router();
const resHndlr = require("../responseHandler");
const middleware = require("../middleware");
const admFacade = require("./adminFacade");
const constants = require("../constants");
const jwtHandler = require("../jwtHandler");
const appUtil = require("../appUtils");
const validators = require("./adminValidators");
const userFacade = require('../user/userFacade')

/**
 * Banner section starts from here
 */

admRoutr.route('/createBanner/:id').post([validators.requiredCheck, validators.verifyBannerToken], (req, res) => {
     admFacade.createBanner(req.body).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})
admRoutr.route('/editBanner/:id/:adminId').put([validators.verifyBannerToken_change], (req, res) => {
    let id = req.params.id;
     admFacade.editBanner(id, req.body).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})
admRoutr.route('/deleteBanner/:id/:adminId').put([validators.verifyBannerToken_change], (req, res) => {
    let id = req.params.id;
     admFacade.deleteBanner(id).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})
admRoutr.route('/resurrectBanner/:id/:adminId').put([validators.verifyBannerToken_change], (req, res) => {
    let id = req.params.id;
     admFacade.resurrectBanner(id).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})
admRoutr.route('/getBannerList').get([validators.verifyAdminToken], (req, res) => {
     admFacade.getAllBanner().then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
});


/**
 * Banner section ends here
 */


 /**
 * starting category section 
 */


admRoutr.route('/createCategory/:id').post([validators.categoryCheck, validators.verifyCategoryToken], (req, res) => {
     admFacade.createCategory(req.body).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})
admRoutr.route('/editCategory/:id/:adminId').put([validators.verifyCategoryToken_check], (req, res) => {
    let id = req.params.id;
     admFacade.editCategory(id, req.body).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})

admRoutr.route('/deleteCategory/:id/:adminId').put([validators.verifyCategoryToken_check], (req, res) => {
    let id = req.params.id;
     admFacade.deleteCategory(id).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})

admRoutr.route('/resurrectCatregory/:id/:adminId').put([validators.verifyBannerToken_change], (req, res) => {
    let id = req.params.id;
     admFacade.resurrectBanner(id).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})
admRoutr.route('/getCategoryList').get([validators.verifyAdminToken], (req, res) => {
     admFacade.getAllCategory().then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})


/**
 * User section starts from here 
 */

admRoutr.route('/createNewUser/:adminId').post([validators.userRequiredCheck,validators.verifyAdminTokenUser], (req, res) => {
    let userObj = req.body
     userFacade.signup(userObj).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})


admRoutr.route('/editParticularUser/:userId/:adminId').put([validators.verifyAdminTokenUser], (req, res) => {
    let { userId } = req.params;
        let obj = req.body;
        userFacade.editProfile(userId,obj).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})

admRoutr.route('/deleteUser/:userId/:adminId').put([validators.verifyAdminTokenUser], (req, res) => {
    let {userId} = req.params;
    return admFacade.deleteUser(userId).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})

admRoutr.route('/getParticularUser/:userId/:adminId').get([validators.verifyAdminTokenUser,], (req, res) => {
    let {userId} = req.params;
    return userFacade.getUser(userId).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})

admRoutr.route('/getUsers').get([validators.verifyAdminToken], (req, res) => {
    return admFacade.getUsers().then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})

/**
 * User section Ends  here 
 */


/**
 * Admin profile section
 */

admRoutr.route('/getAdminProfile/:adminId').get([validators.verifyAdminTokenUser], (req, res) => {
    return admFacade.getAdminProfile().then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})

admRoutr.route('/editAdminProfile/:adminId').put([validators.verifyAdminTokenUser], (req, res) => {
    let obj = req.body;
    let {adminId} = req.params;
    return admFacade.editAdminProfile(adminId,obj).then((result) => {
        resHndlr.sendSuccess(res, result)
    }).catch((err) => {
        resHndlr.sendError(res, err)
    })
})


module.exports = admRoutr;

const usrRoutr = require("express").Router();
const resHndlr = require("../responseHandler");
const usrFacade = require("./userFacade");
const appUtil = require("../appUtils");
const validators = require("./userValidators");
const usrConst = require('./userConstants')


usrRoutr.route('/register')
    .post([validators.requiredCheck, appUtil.convertPass], (req, res) => {
        let userObj = req.body;
        usrFacade.signup(userObj).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch(e => resHndlr.sendError(res, e));
    });

usrRoutr.route('/login')

    .post([validators.validateLogin], (req, res) => {
        let userObj = {
            emailId,
            password,
        } = req.body;
        console.log('data',req.body);
        usrFacade.login(userObj).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((e) => resHndlr.sendError(res, e))
    });


usrRoutr.route('/forgotPassword')
    .post((req, res) => {
        let emailId = req.body.emailId;

        usrFacade.forgot_pass(emailId).then((updated_password) => {
            resHndlr.sendSuccess(res, updated_password)
        }).catch((e) => resHndlr.sendError(res, e))
    });


usrRoutr.route('/resetPassword/:id')
    .post([validators.verifyToken, validators.checkPassMatch], (req, res) => {
        let { id } = req.params;
        let obj = {
            password,
            newPassword,
            confirmPassword
        } = req.body;
        usrFacade.resetPass(id, obj)
            .then((data) => {
                resHndlr.sendSuccess(res, data)
            })
            .catch((err) => {
                resHndlr.sendError(res, err)
            });
    });

usrRoutr.route('/getUserProfile/:id')
    .get([validators.verifyToken], (req, res) => {
        let { id } = req.params;
        usrFacade.getUser(id).then((data) => {
            resHndlr.sendSuccess(res, data);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    })

usrRoutr.route('/editUserProfile/:id')
    .put([validators.verifyToken], (req, res) => {
        let { id } = req.params;
        let obj = req.body;
        usrFacade.editProfile(id, obj).then((data) => {
            resHndlr.sendSuccess(res, data);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    })

usrRoutr.route('/uploadPicture')
    .post((req, res) => {

        usrFacade.uploadProfilePicture(req).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        })
    })


usrRoutr.route('/checkUserValidity').get((req, res) => validators.checkValidToken(req, res));





module.exports = usrRoutr;

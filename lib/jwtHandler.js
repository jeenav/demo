// load all dependencies
var Promise = require("bluebird");
var jwt = Promise.promisifyAll(require("jsonwebtoken"));
var exceptions = require('./customExceptions');
var appConstants = require('./constants');
const development=require("./config/env/development")
var TOKEN_EXPIRATION_SEC = appConstants.TOKEN_EXPIRATION_TIME * 60;


var genUsrToken = function (user) {
    var options = {expiresIn:TOKEN_EXPIRATION_SEC};
    return jwt.signAsync(user,'user_secret', options)
        .then(function (jwtToken) {
            return jwtToken;
        })
        .catch(function (err) {
            throw new exceptions.tokenGenException();
        });
};

var genAdminToken = function (admin, setExpire) {
    var options = {expiresIn:TOKEN_EXPIRATION_SEC};
    return jwt.signAsync(admin,'admin_secret', options)
        .then(function (jwtToken) {
            return jwtToken;
        })
        .catch(function (err) {
            throw new exceptions.tokenGenException();
        });
};

var verifyUsrToken = function (acsTokn) {
    return jwt.verifyAsync(acsTokn, process.env.user_secret)
        .then(function (tokenPayload) {
            this.tokenPayload = tokenPayload;
            return this.tokenPayload ;
        })
        .catch(function (err) {
            return false
        });
};

var verifyAdminToken = function (acsTokn) {
    console.log('acstoken',acsTokn)
    return jwt.verifyAsync(acsTokn,'admin_secret')
        .then(function (tokenPayload) {
            this.tokenPayload = tokenPayload;
            return tokenPayload;
        })
        .catch(function (err) {
            return false
        });
};

module.exports = {
    genUsrToken: genUsrToken,
    verifyUsrToken: verifyUsrToken,
    genAdminToken: genAdminToken,
    verifyAdminToken: verifyAdminToken,
};

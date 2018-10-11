const STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1
};
const ACCOUNT_LEVEL = {
    ADMIN : 1,
    NORMAL_USER : 0
};
const LOGIN_TYPE = {
    FB : 0,
    TW : 1
};
const DB_MODEL_REF = {
    USER : "User",
    VERSION : "Version",
    NOTIFICATIONS: "Notification",
    ADMINACTION:'adminAction',
    CONSTCMS:'constant',
    WATCH:'watch'
};
const TEMPLATEMSG = {
    FORGOTPASSWORD:'FORGOTPASSWORD',
    RESETPASSWORDSUCCESS:'RESETPASSWORDSUCCESS',
    LOGIN:'LOGIN',
    ACCOUNTDEACTIVATION:'ACCOUNTDEACTIVATION',
    RESETPASSWORDFAIL:'RESETPASSWORDFAIL',
    WELCOME:'WELCOME',
    FAILLOGIN:'FAILLOGIN',
    ACCOUNTACTIVATION:'ACCOUNTACTIVATION'
  }


const MESSAGES = {
    intrnlSrvrErr: "Please try after some time.",
    unAuthAccess: "Unauthorized access ",
    tokenGenError: "Error while generating access token",
    invalidEmail: "Please fill valid Email Address",
    invalidMobile: "Please fill valid Mobile No",
    blockedMobile: "Action Blocked for Illegal use of Services.",
    invalidOtp: "Invalid OTP",
    nameCantEmpty: "Name can't be empty",
    invalidZipcode: "please fill valid zip Code",
    invalidNum: "Please fill valid phone number or Do not add country code",
    passCantEmpty: "Password can't be empty",
    validationError : "Validation errors",
    incorrectPass: "Invalid email or passoword",
    userNotFound: "User not found.",
    accessTokenCantEmpty: "Access token cannot be empty",
    tokenSecretCantEmpty: "Secret token cannot be empty",
    incorrectTwToken : "Sorry, we could not contact twitter with the provided token",
    deviceIdCantEmpty : "Device id cannot be empty",
    platformCantEmpty : "Platform cannot be empty or invalid",
    ACCOUNT_DEACTIVATED: "Your account is suspended, please contact the SHiNE admin: vishalrana9915@gmail.com.",

};
const static = {
    'user':'USER',
    'admin':'ADMIN'
}


module.exports = Object.freeze({
    APP_NAME: 'SoLow',
    TOKEN_EXPIRATION_TIME : 24 * 60, // in mins - 60 days
    STATUS_CODE: STATUS_CODE,
    ACCOUNT_LEVEL : ACCOUNT_LEVEL,
    LOGIN_TYPE : LOGIN_TYPE,
    DB_MODEL_REF: DB_MODEL_REF,
    MESSAGES : MESSAGES,
    TEMPLATEMSG:TEMPLATEMSG,
    static:static
});

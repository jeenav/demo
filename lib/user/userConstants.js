const MESSAGES = {
    NAME_CANT_EMPTY: "Name is empty or invalid.",
    PWD_CANT_EMPTY: "Password is empty or invalid.",
    EmailCantEmpty:"email id cannot be empty",
    InvalidEmail:"Invalid email",
    validationError : "Validation errors",
    UserIdCantEmpty : "User id cannot be empty",
    RoleCantEmpty:"Role cannot be empty",
    UserNameCantEmpty : "User name cannot be empty",
    UserNotFound:"User not found.",
    SuccessfulPasswordReset:"Password reset successfully",
    SuccessfulLogin:"Login successful",
    SuccessfulRegister:"Registration Successful",
    InternalServerError:"Internal server error",
    PasswordNotMatch:"Password do not match",
    IdRequired:"Id required",
    UpdateSuccess:"Updated Successfully",
    UploadSuccess:"Image uploaded successfully",
    UserAlreadyExist:"User already exist",
    TOKEN_NOT_PROVIDED:"Please provide token for basic authorization",
    TOKEN_INVALID:"Invalid Access.",
    CAT_REQ: "category id is required for this request",
    Valid:"User valid",
    CONTENT_REQ: "Content is required for this field",
  };


  const CODE = {
    FRBDN:403,
    INTRNLSRVR:500,
    Success:200
  }
  module.exports = {
    MESSAGES:MESSAGES,
    CODE:CODE
};

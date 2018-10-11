
// Load user routes
const usrRouter = require('../user/userRoute');
const admRouter = require('../admin/adminRoute');
// Load video routes

const responseHandler = require('../responseHandler');


//========================== Load Modules End ==============================================

//========================== Export Module Start ====== ========================

module.exports = function (app) {

    // Attach User Routes

    app.use('/soLow/user', usrRouter);
    app.use('/soLow/admin', admRouter)

    // Attach ErrorHandler to Handle All Errors
    app.use(responseHandler.hndlError);
};

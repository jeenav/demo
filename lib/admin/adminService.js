'use strict';

//========================== Load Modules Start =======================
//========================== Load internal modules ====================
//========================== Load internal modules ====================

// Load user dao
const admDao = require('./adminDao');
const admMapper = require('./adminMapper');
const usrDao = require('../user/userDao');
const constants = require('./adminConstants');
//========================== Load Modules End ==============================================


function createBanner(obj) {
    let modifyed = admMapper.createBannerResponse(obj);
    return admDao.create(modifyed).then((result) => result)
}
function editBanner(id, obj) {
    let modifyed = admMapper.editBannerResponse(obj);
    return admDao.edit(id, modifyed).then(function (result) {
        return result;
    })
}
function deleteItems(id, obj) {
    return admDao.edit(id, obj).then(function (result) {
        return admMapper.deleted();
    })
}
function checkIfExist(id) {
    return admDao.checkIfExist(id)
        .then((result) => {
            if (result) {
                // console.log("dsh", result);
                let deleted = 1;
                let obj = {
                    isExpired: deleted,
                    isActive: 0
                }
                if (result.type == 'BANNER')
                    return deleteItems(id, obj)
                else if (result.type == 'CATEGORY')
                    return deleteItems(id, obj)
                else if (result.type == 'EMAIL')
                    return deleteItems(id, obj)
            }
            else
                return admMapper.unAuthorized()

        });
}
function getAllEmailTemplates() {
    return admDao.getAllEmailTemplates().then((result) => {
        return result;
    })
}
function resurrectBanner(id) {
    // console.log("dsh", result);
    let active = 1;
    let expired = 0;
    let obj = {
        isExpired: expired,
        isActive: active
    }
    // if (result.type == 'BANNER' || result.type == 'CATEGORY' ||result.type == 'EMAIL' )
    return resurrection(id, obj)

}

function resurrection(id, obj) {
    return admDao.edit(id, obj).then(function (result) {
        return admMapper.success();
    })
}

function getAllBanner() {
    return admDao.getAllBanner().then((result) => {
        return result;
    })
}
function getUsers() {
    return usrDao.getUsers().then((result) => {
        var count = Object.keys(result).length;
        let data = {
            result: result,
            count: count
        }
        return data
    })
}
function createCategory(obj) {
    let modifyed = admMapper.createCategoryResponse(obj);
    return admDao.create(modifyed).then((result) => result)
}
function editCategory(id, obj) {
    let modifyed = admMapper.editCategoryResponse(obj);
    return admDao.edit(id, modifyed).then(function (result) {
        return result;
    })
}
function getCategory(id) {
    return admDao.getCategory(id).then((result) => {
        return result;
    })
}
function getAllCategory() {
    return admDao.getAllCategory().then((result) => {
        return result;
    })
}



function deleteUser(id) {
    return usrDao.checkUser(id).then((data) => {
        if (data) {
            let updateStatus;
            let updateMsg;
            if (data.status == constants.STATS.active) {
                updateStatus = constants.STATS.inactive
                updateMsg = 0;
            } else {
                updateStatus = constants.STATS.active
                updateMsg = 1;
            }

            return usrDao.deleteUser(id, updateStatus).then(async (result) => {
                console.log(result);
                let response_from_mail;
                if (updateMsg)
                    response_from_mail = await require('../middleware').email.ACCOUNTDEACTIVATION(result.emailId, result);
                else
                    response_from_mail = await require('../middleware').email.ACCOUNTDEACTIVATION(result.emailId, result);

                return admMapper.success();
            })
        } else {
            return admMapper.internalServerError();
        }
    })
}




function getAdminProfile() {
    return usrDao.getAdminProfile().then((data) => {
        return admMapper.getSuccess(data);
    })
}

function editAdminProfile(adminId, obj) {
    return usrDao.editAdminProfile(adminId, obj).then((data) => {
        return admMapper.getSuccess(data);
    })
}

//========================== Export Module Start ==============================

module.exports = {
    createBanner,

    editBanner,

    deleteItems,

    checkIfExist,

    getAllBanner,

    getUsers,

    createCategory,

    editCategory,

    getCategory,

    getAllCategory,

    deleteUser,
    getAllEmailTemplates,

    getAdminProfile,

    editAdminProfile,

    resurrectBanner

};

//========================== Export Module End ===============================

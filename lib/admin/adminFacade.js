
const adminService = require('./adminService');
const admMapper = require('./adminMapper')


function createBanner(obj) {
    return adminService.createBanner(obj).then((result) => {
        if (result)
            return admMapper.createSuccess()
        else
            return admMapper.internalServerError()
    })
}
function editBanner(id, obj) {
    return adminService.editBanner(id, obj).then((result) => {
        if (result)
            return admMapper.editSuccess()
        else
            return admMapper.internalServerError()
    })
}
function deleteBanner(id) {
    return adminService.checkIfExist(id).then((result) => {
        return result;
    })
}

function resurrectBanner(id) {
    return adminService.resurrectBanner(id).then((result) => {
        return result;
    })
}
function getAllBanner() {
    return adminService.getAllBanner().then((result) => {
        if (!result)
            return admMapper.unAuthorized()
        else
            return admMapper.getList(result)
    })
}
function getUsers() {
    return adminService.getUsers().then((result) => {
        if (!result)
            return admMapper.unAuthorized()
        else
            return result
    })
}
function createCategory(obj) {
    return adminService.createCategory(obj).then((result) => {
        if (result)
            return admMapper.createSuccess()
        else
            return admMapper.internalServerError()
    })
}
function editCategory(id, obj) {
    return adminService.editCategory(id, obj).then((result) => {
        if (result)
            return admMapper.editSuccess()
        else
            return admMapper.internalServerError()
    })
}
function deleteCategory(id) {
    return adminService.checkIfExist(id).then((result) => {
        return result;
    })
}
function getAllCategory() {
    return adminService.getAllCategory().then((result) => {
        if (!result)
            return admMapper.unAuthorized()
        else
            return admMapper.getList(result)
    })
}
function getAllEmailTemplates() {
    return adminService.getAllEmailTemplates().then((result) => {
        if (!result)
            return admMapper.unAuthorized()
        else
            return admMapper.getList(result)
    })
}

function deleteUser(id){
    return adminService.deleteUser(id).then((result) => {
        return result;
    })
}



function modify(obj){
    return {
        content:obj.content
    }
}


function getAdminProfile(){
    return adminService.getAdminProfile().then((result) => {
        return result;
    })
}

function editAdminProfile(adminId,obj){
    return adminService.editAdminProfile(adminId,obj).then((result) => {
        return result;
    })
}

module.exports = {
    createBanner,

    editBanner,

    deleteBanner,

    resurrectBanner,

    getAllBanner,

    getUsers,

    createCategory,

    editCategory,

    deleteCategory,

    getAllCategory,

    deleteUser,
    getAllEmailTemplates,
    


    modify,

    getAdminProfile,

    editAdminProfile,


   
}

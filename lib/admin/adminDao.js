
'use strict';

//========================== Load Modules Start =======================
var mongoose = require("mongoose");
const constants = require('../constants');
const mongoQuery = require('../mongoQuery')
//========================== Load internal modules ====================
const Admin = require('./adminModel');
// init user dao
let BaseDao = new require('../dao/baseDao');
const adminDao = new BaseDao(Admin);
const Cms = require('../CMS/cmsModel')
const cmsDao = new BaseDao(Cms);
const watch = require('../user/userWatchModel');
const watchDao = new BaseDao(watch);
function create(obj) {
    let admin = new Admin(obj);
    return admin.save(admin);
}
function checkIfExist(id) {
    let query = { _id: id }
    return adminDao.findById(query);
}
function getAllBanner() {
    let query = {
        "type": 'BANNER'
    }
    return adminDao.find(query, 'name image isActive');
}
function edit(id, obj) {
    let query = {
        _id: mongoose.Types.ObjectId(id)
    }
    let update = {}
    update['$set'] = obj;
    let options = {
        new: true
    }
    return adminDao.findOneAndUpdate(query, update, options);
}
function getCategory(id) {
    let query = {
        _id: id
    }
    return adminDao.find(query, 'name');
}
function getDetails(id) {
    let query = {
        _id: id
    }
    return adminDao.findOne(query, 'name type')
}
function getAllCategory() {
    let query = {
        "type": 'CATEGORY'
    }
    return adminDao.find(query, 'name image apiKey apiSecret url isActive');
}
function getAllEmailTemplates() {
    let query = {
        "type": 'EMAIL'
    }
    return adminDao.find(query, 'name subject text content isActive');
}



module.exports = {

    create,

    edit,

    checkIfExist,

    getAllBanner,

    getCategory,
    
    getDetails,

    getAllCategory,
    getAllEmailTemplates

   

}

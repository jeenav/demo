'use strict';

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var _ = require("lodash");
//========================== Load internal modules ====================
const User = require('./userModel');
var cloudinary = require('cloudinary');
var development = require('../config/env/development')
// init user dao
let BaseDao = new require('../dao/baseDao');
const userDao = new BaseDao(User);
const fs = require('fs');
const constants = require('../constants');
const cmsModel = require('../CMS/cmsModel');
const cmsDao = new BaseDao(cmsModel);
const usrWatch = require('./userWatchModel');
const usrWatchDao = new BaseDao(usrWatch);
cloudinary.config({
    cloud_name: development.cloudinary_name,
    api_key: development.cloudinary_key,
    api_secret: development.cloudinary_secret
});
//========================== Load Modules End ==============================================

function checkIfExist(email) {
    console.log('email',email)
    let query = {
        emailId: email
    }
    return userDao.findOne(query);
}

function checkUser(id) {
    console.log('id',id)
    let query = {
        _id: id
    }
    return userDao.findOne(query);
}
function registerUser(userInfo) {
    let user = new User(userInfo);
    return userDao.save(user);
}
function editProfile(id, obj) {
    let query = {
        _id: mongoose.Types.ObjectId(id)
    }
    let update = {}
    update['$set'] = obj;
    let options = {
        new: true
    }
    return userDao.findOneAndUpdate(query, update, options);
}

function reset_password(email, pass) {
    let query = {};
    query.emailId = email;

    let update = {}
    update.password = pass;
    return userDao.update(query, update);
}
function uploadProfilePicture(req) {
    return new Promise(function (resolve, reject) {
        var binary = new Buffer(req.body.file, 'base64');
        fs.writeFile('test.jpg', binary, 'binary', function () {
            cloudinary.uploader.upload('test.jpg', function (result) {
                if (result)
                    resolve(result.url)
                else
                    reject('error');
            })
        });
    })
}
function saveChange(data) {
    let query = {}
    query._id = data._id;
    let update = {}
    update['password'] = data.password;
    return userDao.update(query, update);
}
function getUsers() {
    let query = {
        "userRole": constants.static.user
    }
    return userDao.find(query, 'fullName gender  emailId imageUrl');
}

function deleteUser(id, status) {
    let query = {
        _id: id
    }

    let updated = {}
    updated.status = status;

    let option = {}
    option.new = true
    return userDao.findOneAndUpdate(query, updated, option);
}



function getAdminProfile() {
    let query = {};
    query["userRole"] = constants.static.admin;
    let projection = '_id fullName emailId imageUrl gender userRole status';
    return userDao.findOne(query, projection)
}

function editAdminProfile(id, newModel) {

    // console.log(newModel)
    let query = {};
    query["_id"] = id;
    let update = newModel;
    let options = {};
    options['new'] = true
    return userDao.findOneAndUpdate(query, update, options)
}



//========================== Export Module Start ==============================

module.exports = {
   

    checkIfExist,

  
    reset_password,

    registerUser,

    checkUser,

    editProfile,

    uploadProfilePicture,

    saveChange,

    getUsers,

    deleteUser,

    getAdminProfile,

    editAdminProfile

   
};

//========================== Export Module End ===============================

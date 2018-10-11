var constants = require('../constants');
let mongoose = require('mongoose');
let constantAction = new mongoose.Schema({
    
    // name :{type:String,enum:[constants.CMS.termCondition,constants.CMS.aboutUs,constants.CMS.privacyPolicy],required:true,unique:true},

    createdAt: { type: Date, default: Date.now },
    content:{ type: String,required:true },
    isActive: { type: Number, default: 1 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: constants.DB_MODEL_REF.USER },
    editedBy: { type: mongoose.Schema.Types.ObjectId, ref: constants.DB_MODEL_REF.USER }
}, {
        versionkey: false
    }
)

module.exports = mongoose.model(constants.DB_MODEL_REF.CONSTCMS, constantAction);

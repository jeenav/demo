var constants = require('../constants');
let adminConst = require('./adminConstants');
let mongoose = require('mongoose');
let adminAction = new mongoose.Schema({
    name: { type: String, unique: true, required: true },

    type: { type: String, enum: [adminConst.STATS.banner, adminConst.STATS.category, adminConst.STATS.email], required: true },

    image: {
        type: String, required: function () {
            if (this.type == adminConst.STATS.banner) {
                return true
            }
        }
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: constants.DB_MODEL_REF.USER },

    createdAt: { type: Date, default: Date.now },

    isActive: { type: Number, default: 1 },

    isExpired: { type: Number, default: 0 },

    url: {
        type: String, required: function () {
            return (this.type == adminConst.STATS.category) ? true : false
        }
    },
    apiKey: {
        type: String, required: function () {
            return (this.type == adminConst.STATS.category) ? true : false
        }
    },
    apiSecret: {
        type: String, required: function () {
            return (this.type == adminConst.STATS.category) ? true : false
        }
    },
    content: {
        type: String, required: function () {
            return (this.type == adminConst.STATS.email) ? true : false
        }
    },
    subject: {
        type: String, required: function () {
            return (this.type == adminConst.STATS.email) ? true : false
        }
    },
    text: {
        type: String, required: function () {
            return (this.type == adminConst.STATS.email) ? true : false
        }
    },
  //  watchList:[],
    expiryTime: Number,
    pinPosition: Number,
    editedBy: { type: mongoose.Schema.Types.ObjectId, ref: constants.DB_MODEL_REF.USER },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: constants.DB_MODEL_REF.USER },
}, {
        versionkey: false
    }
)

module.exports = mongoose.model(constants.DB_MODEL_REF.ADMINACTION, adminAction);

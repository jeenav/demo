// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');
var Schema = mongoose.Schema;
var watchSchema = new Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:constants.DB_MODEL_REF.USER},
    status: { type: String, default: 'ACTIVE',enum:['ACTIVE','INACTIVE'] },
    categoryId:{type:mongoose.Schema.Types.ObjectId,ref:constants.DB_MODEL_REF.ADMINACTION},
    objType:{type:String,enum:['WATCH','FEEDBACK']},
    content:{
      context:String,
      contentStatus:{type:String,enum:['ACTIVE','INACTIVE'],default:'ACTIVE'}
    },
    watchItemId:{type:String,required:function(){
      return (this.objType == 'WATCH') ? true :false;
    }},
    createdAt:{type:Date,default:Date.now},
    editedAt:{type:Date,default:Date.now},
    watchObj:[],
    comment:{
      commentBy:mongoose.Schema.Types.ObjectId,
      content:String,
      commentAt:Number,
      commentStatus:{type:String,enum:['ACTIVE','INACTIVE']}
    }
},
  {
    versionKey: false
  });


module.exports = mongoose.model(constants.DB_MODEL_REF.WATCH, watchSchema);

/*module.exports = rootRef*/

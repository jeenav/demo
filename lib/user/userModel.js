// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');
var appUtil = require('../appUtils');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  fullName: { type: String, required: true },
  password: {
    type: String, required: true
  },
  emailId: {
    type: String, required: true
  },
  gender: { type: String, enum: ['Male', 'Female'], default: 'Female' },
  imageUrl: { type: String },
  type: {
    type: String, enum: ['NORMAL', 'SOCIAL'], default: 'NORMAL'
  },
  
  userRole: { type: String,enum: ['USER', 'ADMIN'], default: 'USER' },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'ACTIVE' },
},
  {
    versionKey: false
  });


User = module.exports = mongoose.model(constants.DB_MODEL_REF.USER, UserSchema);

User.countDocuments(async function (err, data) {
  if (err) {
    console.log('error while creating admin');
  } else if (data == 0) {
    let obj = {
      "fullName": 'Jeena Varghese',
      "password": 'jee123',
      "emailId": 'jeena.varghese@codezeros.com',
      "imageUrl": 'http://res.cloudinary.com/dizkwji5k/image/upload/v1536231694/zbo50yfdwoyda7ib3lfk.jpg',
      "userRole": "ADMIN"
    };

    let updatedPass = await appUtil.generateSaltAndHashForPassword(obj.password);
    obj.password = updatedPass;
    console.log(obj)
    let user = new User(obj);
    user.save(function (err, result) {
      (err) ? console.log(err) : console.log('admin created successfully.')
    })


  }
})


/*module.exports = rootRef*/

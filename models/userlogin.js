
const mongoose = require('mongoose');
const userloginSchema = new mongoose.Schema({
    user: { type: String },
    pass: { type: String },
    fname: {type: String},
    lname: {type: String}
  },{ versionKey: false });
  
const userloginModel = mongoose.model('Loginuser', userloginSchema, 'users');

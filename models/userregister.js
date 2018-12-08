
const mongoose = require('mongoose');
const userregisterSchema = new mongoose.Schema({
  fname: {type: String},
  lname: {type: String},
  user: { type: String },
  pass: { type: String },
  pic: { type: String}
},{ versionKey: false });

const registerModel = mongoose.model('Registeruser', userregisterSchema, 'users');


const mongoose = require('mongoose');
const guideSchema = new mongoose.Schema({
    title: {type: String},
    pointa: {type: String},
    pointb: { type: String },
    description: { type: String },
    pic: { type: String},
    author: { type: String},
  },{ versionKey: false });
var guideModel = mongoose.model("guides", guideSchema, 'guides')
  /*
insertedfiles

  */


const mongoose = require('mongoose');
const addguideSchema = new mongoose.Schema({
    title: {type: String},
    pointa: {type: String},
    pointb: { type: String },
    description: { type: String },
    pic: { type: String}
  },{ versionKey: false });
  const addguideModel = mongoose.model("addguide", addguideSchema, 'guides')

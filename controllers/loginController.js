
const express = require('express');

const fileUpload = require('express-fileupload');
const server = express();
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const md5 = require('md5');
// ---- URL PARSER
var url = require('url');
var session = require('express-session');
server.use(session({secret: 'ssshhhhh'})); 
// ----
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload({ createParentPath: true, safeFileNames: true, preserveExtension: true}));
mongoose.connect('mongodb://localhost:27017/commuteny');
var sess;
const userloginSchema = new mongoose.Schema({
    user: { type: String },
    pass: { type: String },
    fname: {type: String},
    lname: {type: String}
  },{ versionKey: false });
  
const userloginModel = mongoose.model('Loginuser', userloginSchema, 'users');

module.exports = {
    loginUser : function(req, res){
        sess=req.session;
        
        console.log(req.body.username);
        console.log(req.body.password);
        const loginQuery = { user:req.body.username, pass:md5(req.body.password) };
        userloginModel.findOne(loginQuery, function(err,result){
        if(result===null){
            res.render('./pages/login');
        }
        else if(result!=null){
            console.log(result);
            sess.user = result;
            res.redirect('./view-guides');
        }
        });
    },
    
}

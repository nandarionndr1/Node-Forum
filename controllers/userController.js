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

const userregisterSchema = new mongoose.Schema({
  fname: {type: String},
  lname: {type: String},
  user: { type: String },
  pass: { type: String },
  pic: { type: String}
},{ versionKey: false });

const registerModel = mongoose.model('Registeruser', userregisterSchema, 'users');


var sess;
module.exports = {
    profile : function(req, res){
        res.render('./pages/profile');
    },
    editUser : function(req, res){
        res.render('./pages/edituser');
    },
    add_comment_user : function(req, res){
        res.render('./pages/add-comment-user');
    },
    register : function(req, res){
        console.log(req.body.firstname);
        console.log(req.body.lastname);
        console.log(req.body.email);
        console.log(req.files.profilepic.name);
        const registerInstance = registerModel({
            fname: req.body.firstname,
            lname: req.body.lastname,
            user: req.body.email,
            pass: md5(req.body.password1),
            pic: req.files.profilepic.name
        });
        let uploadedimg = req.files.profilepic;
            uploadedimg.mv('public/images/profpics/' + req.files.profilepic.name, function(err){
                if(err) return console.log(err);
            });
        registerInstance.save(function(err,fluffy){
            if (err) return console.error(err);
            res.render('./pages/login')
        });
    },
    viewRegister : function(req, res){
        sess = req.session;
            /*
            var guideModel = mongoose.model("guides");
            console.log(sess);
            
            const guideInstance = guideModel({
                 title:  'Commute to Buendia',
                 pointa: 'Vito Cruz',
                 pointb: 'Bambang',
                 description: 'Toyota Bambang Vito Cruz',
                 pic: 'images/guides/BOOTH.png',
                 author: sess.user._id
             });
             guideInstance.save(function(err,fluffy){
               if (err) return console.error(err);
             });
             */
             res.render('./pages/register');
             
    },
    getAuthorDetails : function(req, res){
        //do somethingvar   
        url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        var guides = mongoose.model('Registeruser');
        guides.find({ '_id': req.query.id },{}, function (err, data) {

            console.log("authid",req.query.id);

        res.send(data);
        console.log("data returned",data);
        });

     }
    
}

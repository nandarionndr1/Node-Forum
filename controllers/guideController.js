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
var sess;
// ----
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload({ createParentPath: true, safeFileNames: true, preserveExtension: true}));
mongoose.connect('mongodb://localhost:27017/commuteny');


  const guideSchema = new mongoose.Schema({
      title: {type: String},
      pointa: {type: String},
      pointb: { type: String },
      description: { type: String },
      pic: { type: String},
      author: { type: String},
    },{ versionKey: false });
  var guideModel = mongoose.model("guides", guideSchema, 'guides')
module.exports = {
    viewGuide : function(req, res){
        sess = req.session;
        var all_ct = 0;
        mongoose.model('guides').find(function(err, guides) {
            all_ct = guides.length;
            res.render('./pages/view-guides',{current_user:sess.user,all_count:all_ct});
        });
    },
    viewAddGuide : function(req, res){
       
        sess = req.session;
        res.render('./pages/addguide',{current_user:sess.user});
    },
    viewEditGuide : function(req, res){
        sess = req.session;
        var guide = mongoose.model('guides');
        guide.find({ '_id': req.body.id },{}, function (err, guide) {
            res.render('./pages/editguide',{current_user:sess.user,guide:guide[0]});
        });
    },
    editGuide : function(req, res){
        var guide = mongoose.model('guides');
        guide.findById(req.body.id, function (err, guide) {
            if (err) return handleError(err);
            if(req.files.guidepic != null){
                guide.set({ pic: 'images/guides/'+req.files.guidepic.name});
                let uploadedimg = req.files.guidepic;
                    uploadedimg.mv('public/images/guides/' + req.files.guidepic.name, function(err){
                    if(err) return console.log(err);
                });        
            }
            guide.set({ 
                title: req.body.posttitle,
                pointa: req.body.loca,
                pointb: req.body.locb,
                description: req.body.descp,
                author: sess.user._id 
            });
            guide.save(function (err, updatedTank) {
              if (err) return handleError(err);
              res.redirect('/view-guides');
            });
          });
    },
    getGuides : function(req, res){
       //do somethingvar   
        url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        guides = req.query.start;
        mongoose.model('guides').find(function(err, guides) {
        res.send(guides);
        });
    },
    createGuide : function(req, res){
            sess = req.session;
            console.log(req.body.posttitle);
            console.log(req.body.loca);
            console.log(req.body.locb);
            console.log(req.body.descp);
            console.log(req.files.guidepic.name);
            console.log(sess.user._id);
        
             const addguideInstance = guideModel({
             title: req.body.posttitle,
             pointa: req.body.loca,
             pointb: req.body.locb,
             description: req.body.descp,
             pic: 'images/guides/'+req.files.guidepic.name,
             author: sess.user._id
           })
        
        let uploadedimg = req.files.guidepic;
            uploadedimg.mv('public/images/guides/' + req.files.guidepic.name, function(err){
            if(err) return console.log(err);
          });
        
           addguideInstance.save(function(err,fluffy){
            if (err) return console.error(err);
            res.redirect('/view-guides')
            })
    },
    lazyLoadGuide : function(req, res){
        row = Number(req.body.row);
        mongoose.model('guides').find(function(err, guides) {
            var gd = guides.slice(row+1,row+4);
            console.log(guides.length);
            console.log(gd.length);
            res.send(gd);
        });
    },
    updateGuide : function(req, res){
        //do something
    },viewGuideDetail : function(req, res){
        sess = req.session;
        var guide = mongoose.model('guides');
        console.log(req.params.guideId);
        guide.find({ '_id': req.params.guideId },{}, function (err, guide) {
            console.log(guide);
            res.render('./pages/guide-detail',{current_user:sess.user,guide:guide[0]});
        });
    },

}
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

const commentSchema = new mongoose.Schema({
    comment: { type: String },
    image: { type: String },
    path: {type: String},
    user: {type: String},
    guide: {type: String}
  },{ versionKey: false });
  const commentModel = mongoose.model('comment', commentSchema);

server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload({ createParentPath: true, safeFileNames: true, preserveExtension: true}));
mongoose.connect('mongodb://localhost:27017/commuteny');

module.exports = {
    viewAddComment : function(req, res){
        res.render('./pages/add-comment');
    },
    getComments : function(req, res){
        //do somethingvar   
        url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        var comment = mongoose.model('comment');
        comment.find({ 'guide': req.query.id },{}, function (err, comments) { 
            res.send(comments);
        });
     },
     lazyLoadComments : function(req, res){
        row = Number(req.body.row);
        var comment = mongoose.model('comment');
        comment.find({ 'guide': req.body.id },{}, function (err, comments) { 
            console.log(comments);
            res.send(comments.slice(row+1,row+2));
        });
    },
    addComment : function(req, res){
        sess = req.session;
        const commentInstance = commentModel({
            comment: req.body.comment,
            image: req.files.image.name,
            user: sess.user._id,
            guide: req.body.guide_id,
            path: 'images/comments/' + req.files.image.name
        });
    
        commentInstance.save(function (err, fluffy){})
    
        let uploadedimg = req.files.image;
        uploadedimg.mv('public/images/comments/' + req.files.image.name, function(err){
            if(err) return console.log(err);
            else console.log("Image uploaded");
        })
       res.redirect('/guide/'+req.body.guide_id);
    
    },    
    viewEditComment : function(req, res){
        sess = req.session;
        var guide = mongoose.model('comment');
        guide.find({ '_id': req.body.id },{}, function (err, comment) {
            res.render('./pages/editcomment',{current_user:sess.user,comment:comment[0]});
        });
    },
    editComment : function(req, res){
        var guide = mongoose.model('comment');
        guide.findById(req.body.id, function (err, guide) {
            if (err) return handleError(err);
            if(req.files.image != null){
                guide.set({ image: 'images/guides/'+req.files.image.name,path:'images/guides/'+req.files.image.name});
                let uploadedimg = req.files.image;
                    uploadedimg.mv('public/images/guides/' + req.files.image.name, function(err){
                    if(err) return console.log(err);
                });        
            }
            guide.set({ 
                comment: req.body.comment,
            });
            guide.save(function (err, updatedTank) {
              if (err) return handleError(err);
              res.redirect('/guide/'+req.body.guide_id);
            });
          });
    },
    
}
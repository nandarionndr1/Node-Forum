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
// ---- DEFINE SESSION
server.use(session({secret: 'ssshhhhh'})); 
// ----

server.use(express.static( "public" ));

var routes = require('./routes');
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload({ createParentPath: true, safeFileNames: true, preserveExtension: true}));
mongoose.connect('mongodb://localhost:27017/commuteny');
server.set('view engine', 'ejs');
/*
fs.readdirSync(__dirname + '/models/').forEach(function(filename) {
  if (~filename.indexOf('.js')){
    require(__dirname + '/models/' + filename);
  }
});
*/

current_user = null;
// load all files in models directory

server.get('/', function(req, resp){
   resp.render('./pages/index');
});

server.get('/index', function(req, resp){
   resp.render('./pages/index');
});

server.get('/about', function(req, resp){
   resp.render('./pages/about');
});
server.get('/login', function(req, resp){
   resp.render('./pages/login');
});

server.use('/',routes);
const port = process.env.PORT | 9090;
server.listen(port);
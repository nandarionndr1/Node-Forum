var express = require('express');
var commentCtrl = require('./controllers/commentController');
var guideCtrl = require('./controllers/guideController');
var loginCtrl = require('./controllers/loginController');
var userCtrl = require('./controllers/userController');

var router = express.Router();

router.route('/getGuides').get(guideCtrl.getGuides);
router.route('/add-guide').post(guideCtrl.createGuide);
router.route('/updateGuide').get(guideCtrl.updateGuide);
router.route('/view-guides').get(guideCtrl.viewGuide);
router.route('/view-edit-guide').post(guideCtrl.viewEditGuide);
router.route('/edit-guide').post(guideCtrl.editGuide);
router.route('/addguide').get(guideCtrl.viewAddGuide);
router.route('/lazyLoadGuide').post(guideCtrl.lazyLoadGuide);
router.route('/guide/:guideId').get(guideCtrl.viewGuideDetail);

router.route('/login').post(loginCtrl.loginUser);

router.route('/register').get(userCtrl.viewRegister);
router.route('/register').post(userCtrl.register);
router.route('/edit-user').get(userCtrl.editUser);
router.route('/profile').get(userCtrl.profile);
router.route('/add-comment-user').get(userCtrl.add_comment_user);
router.route('/getAuthorDetails').get(userCtrl.getAuthorDetails);

router.route('/add-comment').get(commentCtrl.viewAddComment);
router.route('/add-comment').post(commentCtrl.addComment);
router.route('/getComments').get(commentCtrl.getComments);
router.route('/lazyLoadComments').post(commentCtrl.lazyLoadComments);
router.route('/view-edit-comment').post(commentCtrl.viewEditComment);
router.route('/edit-comment').post(commentCtrl.editComment);

module.exports = router;
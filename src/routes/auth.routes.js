var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/confirm/:token', function (req, res) {
  userController.verifyUser(req, res);
});

module.exports = router;

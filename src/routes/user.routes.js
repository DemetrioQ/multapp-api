var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');


router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.post('/login', (req, res) => {
  userController.userLogin(req, res);
});

router.post('/register', (req, res) => {
  userController.registerUser(req, res);
});

module.exports = router;

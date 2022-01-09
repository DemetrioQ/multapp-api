var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/login', (req, res) => {
  userController.userLogin(req, res);
});

router.post('/register', (req, res) => {
  userController.registerUser(req, res);
});

router.get('/find/:id', (req, res) => {
  userController.getUserByPersonId(req, res);
});

module.exports = router;

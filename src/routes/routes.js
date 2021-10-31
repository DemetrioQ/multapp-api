var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const env = process.env;

// middleware that is specific to this router
router.use(function authenticate(req, res, next) {
  const apiKey = req.query.api_key;
  console.log(apiKey);
  if (!apiKey || apiKey !== env.ApiKey) {
    res.status(401).send({ Message: 'Not authorized' });
  } else {
    next();
  }
});
// define the home page route
router.get('/', function (req, res) {
  res.send('Hello World!');
});

// define the about route
// router.get('/all', async (req, res) => {
//   const Users = await AppUser.findAll();
//   res.send(Users);
// });

router.post('/login', (req, res) => {
  userController.userLogin(req, res);
});

router.post('/register', (req, res) => {
  userController.registerUser(req, res);
});

module.exports = router;

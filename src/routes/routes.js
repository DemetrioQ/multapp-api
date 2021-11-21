var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const env = process.env;

// middleware that is specific to this router
router.use(function authenticate(req, res, next) {
  const apiKey = req.query.api_key;
  if (apiKey !== env.ApiKey) {
    res.status(401).send({ Message: 'Not authorized' });
  } else {
    next();
  }
});

module.exports = router;

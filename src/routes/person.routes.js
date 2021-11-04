var express = require('express');
var router = express.Router();
const personController = require('../controllers/person.controller');

router.get('/', function (req, res) {
  res.send('Hello World! from person');
});

router.get('/document/:document', (req, res) => {
  personController.getPersonByDocument(req, res);
});

router.get('/id/:id', (req, res) => {
  personController.getPersonById(req, res);
});

module.exports = router;

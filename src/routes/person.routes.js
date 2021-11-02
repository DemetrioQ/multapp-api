var express = require('express');
var router = express.Router();
const personController = require('../controllers/person.controller');

router.get('/', function (req, res) {
  res.send('Hello World! from person');
});


router.get('/:document', (req, res) => {
  personController.getPerson(req, res);
});

module.exports = router;

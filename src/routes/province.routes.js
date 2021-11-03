var express = require('express');
var router = express.Router();
const provinceController = require('../controllers/province.controller');

router.get('/all', function (req, res) {
  provinceController.getAllProvinces(req, res);
});

module.exports = router;

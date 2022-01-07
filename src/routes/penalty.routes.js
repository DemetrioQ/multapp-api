var express = require('express');
var router = express.Router();
const penaltyController = require('../controllers/penalty.controller');

router.get('/', function (req, res) {
  res.send('Hello World! from penalty');
});

// router.post('/create', (req, res) => {
//   penaltyController.createPenalty(req, res);
// });

router.get('/types/all', (req, res) => {
  penaltyController.getPenaltiesTypes(req, res);
});

router.get('/all', (req, res) => {
  penaltyController.getPenalties(req, res);
});

router.get('/:id', (req, res) => {
  penaltyController.getPenaltiesByPersonId(req, res);
});


router.post('/create', (req, res) => {
  penaltyController.createPenalty(req, res);
});

router.post('/pay', (req, res) => {
  penaltyController.payPenalty(req,res)
});

module.exports = router;

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


// router.get('/user', (req, res) => {
//   penaltyController.getUserPenalties(req, res);
// });

router.post('/create', (req, res) => {
  penaltyController.createPenalty(req, res);
});



module.exports = router;

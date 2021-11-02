const Person = require('../models').Person;
const Penalty = require('../models').Penalty;
const PenaltyType = require('../models').PenaltyType;

//create penalty
exports.createPenalty = (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.typeid) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  const penalty = {
    Username: req.body.username,
    Password: req.body.password,
    UserTypeId: req.body.typeid,
  };

  AppUser.create(user)
    .then((user) => {
      res.send({ success: true, user: user });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

exports.getPenalties = (req, res) => {
  PenaltyType.findAll({ attributes: { exclude: ['CreatedDate'] } }).then((penalties) => {
    res.send(penalties);
  });
};

exports.getUserPenalties = (req, res) => {
  Penalty.findAll({
    include: [
      {
        model: Person,
      },
      {
        model: PenaltyType,
      },
    ],
  }).then((penalties) => {
    res.send(penalties);
  });
};

// delete user.dataValues.Password;

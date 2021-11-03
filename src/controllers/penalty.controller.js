const Person = require('../models').Person;
const Penalty = require('../models').Penalty;
const PenaltyType = require('../models').PenaltyType;

//create penalty
exports.createPenalty = (req, res) => {
  console.log(req.body)
  const penalty = {
    PersonId: req.body.PersonId,
    PenaltyTypeId: req.body.PenaltyTypeId,
    ProvidenceId: req.body.ProvidenceId,
    Description: req.body.Description,
    Address: req.body.Address,
  };
  
  if (!Object.values(penalty).every((o) => o !== null)) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  
  console.log(penalty);
  Penalty.create(penalty)
    .then((penalty) => {
      res.send({ success: true, penalty: penalty });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Penalty.',
      });
    });
};

exports.getPenaltiesTypes = (req, res) => {
  PenaltyType.findAll({ attributes: { exclude: ['CreatedDate'] } }).then((penalties) => {
    res.send(penalties);
  });
};

exports.getPenalties = (req, res) => {
  Penalty.findAll({ attributes: { exclude: ['CreatedDate'] } }).then((penalties) => {
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

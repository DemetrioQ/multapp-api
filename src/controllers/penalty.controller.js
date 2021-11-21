const Person = require('../models').Person;
const Penalty = require('../models').Penalty;
const PenaltyType = require('../models').PenaltyType;
const Province = require('../models').Province;

//create penalty
exports.createPenalty = (req, res) => {
  const penalty = {
    PersonId: req.body.personId,
    PenaltyTypeId: req.body.penaltyTypeId,
    ProvinceId: req.body.provinceId,
    Description: req.body.description,
    Address: req.body.address,
  };

  if (!Object.values(penalty).every((o) => o !== null)) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Penalty.create(penalty)
    .then((penalty) => {
      return res.send(penalty);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the Penalty.',
      });
    });
};

exports.getPenaltiesTypes = (req, res) => {
  PenaltyType.findAll({ attributes: { exclude: ['CreatedDate'] } }).then((penalties) => {
    return res.status(200).send(penalties);
  });
};

exports.getPenalties = (req, res) => {
  Penalty.findAll({ attributes: { exclude: ['CreatedDate'] } })
    .then((penalties) => {
      return res.status(200).send(penalties);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the Penalty.',
      });
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
  })
    .then((penalties) => {
      return res.status(200).send(penalties);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the Penalty.',
      });
    });
};

exports.getPenaltiesByPersonId = (req, res) => {
  const id = req.params.id;
  Penalty.findAll({
    where: { PersonId: id },
    include: [
      { model: PenaltyType, attributes: { exclude: ['Id', 'CreatedDate'] } },
      { model: Province, attributes: { exclude: ['Id', 'CreatedDate'] } },
    ],
    attributes: { exclude: ['Id', 'PersonId', 'PenaltyTypeId', 'ProvinceId'] },
  })
    .then((penalties) => {
      return res.status(200).send(penalties);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the Penalty.',
      });
    });
};

const Person = require('../models').Person;
const Penalty = require('../models').Penalty;
const PenaltyType = require('../models').PenaltyType;
const Province = require('../models').Province;

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const env = process.env;
const stripeSecretKey = env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

//create penalty
exports.createPenalty = (req, res) => {
  const penalty = {
    PersonId: req.body.personId,
    PenaltyTypeId: req.body.ley.id,
    ProvinceId: req.body.provincia.id,
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
    attributes: { exclude: ['PenaltyTypeId', 'ProvinceId'] },
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

exports.payPenalty = (req, res) => {
  console.log(req.body);
  Penalty.update({ Paid: true }, { where: { Id: req.body.multa.id } })
    .then((result) => {
      console.log(result);
      stripe.charges
        .create({
          amount: req.body.amount * 100,
          source: req.body.token,
          currency: 'dop',
        })
        .then(() => {
          console.log('Charge Successful');
          res.status(200).send({message: "success"})
        })
        .catch((err) => {
          console.log(err);
          console.log('Charge Fail');
          res.status(500).end();
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
};
// .then((result) =>
//   res.status(200).send({ message: 'Successfully purchased items' });
// ).catch((err) =>{
//   res.status(500).send({message: "error"});
// });

const Person = require('../models').Person;
const DocumentType = require('../models').DocumentType;
const PersonType = require('../models').PersonType;
//create and save user

exports.getPerson = (req, res) => {
  const document = req.params.document;
  if (!document) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  Person.findOne({ where: { DocumentNumber: document }, attributes: { exclude: ['DocumentTypeId', 'PersonTypeId', 'CreatedDate'] } })
    .then((person) => {
      if (!person) {
        res.status(401).send({ error: 'Invalid Document' });
      }

      res.send(person);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while searching the Person.',
      });
    });
};
const Province = require('../models').Province;
//create and save user

exports.getAllProvinces = (req, res) => {
  Province.findAll({ attributes: { exclude: ['CreatedDate'] } })
    .then((provinces) => {
      if (!provinces) {
        return res.status(401).send({ error: 'No provinces' });
      }

      return res.status(200).send(provinces);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while getting the provinces.',
      });
    });
};

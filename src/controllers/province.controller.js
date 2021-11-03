const Province = require('../models').MProvince;
//create and save user

exports.getAllProvinces = (req, res) => {
  Province.findAll({ attributes: { exclude: ['CreatedDate'] } })
    .then((provinces) => {
      if (!provinces) {
        res.status(401).send({ error: 'No provinces' });
      }

      res.send(provinces);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while getting the provinces.',
      });
    });
};

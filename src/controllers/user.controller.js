const bcrypt = require('bcrypt');
const AppUser = require('../models').AppUser;
//create and save user
exports.userLogin = (req, res) => {
  const appUser = {
    username: req.body.username,
    password: req.body.password,
  };

  AppUser.findOne({ where: { Username: appUser.username }, attributes: { exclude: ['Id', 'Locked', 'LockedDate', 'Authorized', 'AuthorizedDate', 'CreatedDate'] } })
    .then((user) => {
      if (!user) {
        res.status(401).send({ error: 'The username or password is incorrect' });
      }
      if (!AppUser.verifyPassword(appUser.password, user.Password) && appUser.password != user.password) {
        res.status(401).send({ error: 'The username or password is incorrect' });
      }
      delete user.dataValues.Password;
      res.send(user.dataValues);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while searching the User.',
      });
    });
};

exports.registerUser = (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.typeid) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  const user = {
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

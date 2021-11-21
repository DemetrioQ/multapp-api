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
        return res.status(401).send({ error: 'The username or password is incorrect' });
      }

      if (!AppUser.verifyPassword(appUser.password, user.Password) && appUser.password != user.Password) {
        return res.status(401).send({ error: 'The username or password is incorrect' });
      }
      delete user.dataValues.Password;
      return res.send(user.dataValues);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while searching the User.',
      });
    });
};

exports.registerUser = (req, res) => {
  const user = {
    PersonId: req.body.personId,
    Username: req.body.username,
    Password: req.body.password,
    UserTypeId: 2,
  };

  if (!Object.values(user).every((o) => o !== null)) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  AppUser.create(user)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

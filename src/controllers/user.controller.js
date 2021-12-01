const AppUser = require('../models').AppUser;
const Token = require('../models').Token;
const Person = require('../models').Person;
var jwt = require('jsonwebtoken');
const config = require('../config/config');
const nodemailer = require('../config/nodemailer.config');

//create and save user
exports.userLogin = (req, res) => {
  const appUser = {
    username: req.body.username,
    password: req.body.password,
  };

  AppUser.findOne({
    where: { Username: appUser.username },
    attributes: { exclude: ['Id', 'Locked', 'LockedDate', 'Authorized', 'AuthorizedDate', 'CreatedDate', 'PersonId'] },
    include: [
      {
        model: Person,
      },
    ],
  })
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
    PersonId: req.body.persona.id,
    Username: req.body.username,
    Password: req.body.password,
    Email: req.body.email,
    UserTypeId: 2,
  };

  if (!Object.values(user).every((o) => o !== null)) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  AppUser.create(user)
    .then((user) => {
      const token_s = jwt.sign({ email: user.email }, config.secret);

      const token = {
        AppUserId: user.Id,
        Token: token_s,
      };

      Token.create(token)
        .then((data) => {
          nodemailer.sendConfirmationEmail(user.Username, user.Email, data.Token, req);
          return res.status(200).send(user);
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message || 'Some error occurred while creating the User.',
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

exports.verifyUser = (req, res) => {
  const token = req.params.token;

  Token.findOne({ where: { Token: token } })
    .then((token) => {
      if (!token) {
        return res.status(400).render(__dirname + '../../views/userVerify', { message: 'Token not found' });
      }
      AppUser.findOne({ where: { Id: token.AppUserId } })
        .then(async (user) => {
          if (user.Enabled) {
            return res.status(409).render(__dirname + '../../views/userVerify', { message: 'User already verified' });
          }
          user.Enabled = true;
          await user.save();
          return res.status(200).render(__dirname + '../../views/userVerify', { message: 'User has been verified' });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message || 'Some error occurred while creating the User.',
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

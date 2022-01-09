const AppUser = require('../models').AppUser;
const Token = require('../models').Token;
const Person = require('../models').Person;
var jwt = require('jsonwebtoken');
const config = require('../config/config');
const nodemailer = require('../config/nodemailer.config');
const db = require('../models/index');

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

exports.registerUser = async (req, res) => {
  try {
    const userobj = {
      PersonId: req.body.persona.id,
      Username: req.body.username,
      Password: req.body.password,
      Email: req.body.email,
      UserTypeId: 2,
    };
    if (!Object.values(userobj).every((o) => o !== null)) {
      return res.status(400).send({
        message: 'Content can not be empty!',
      });
    }
    // const t = await Sequelize.transaction();

    const result = await db.sequelize.transaction(async (t) => {
      const user = await AppUser.create(userobj, { transaction: t });
      if (!user) {
        throw new Error('Some error occurred while creating the User.');
      }
      const token_s = jwt.sign({ email: user.email }, config.secret);
      if (!token_s) {
        throw new Error('Some error occurred while generating the Token.');
      }
      const tokenobj = {
        AppUserId: user.Id,
        Token: token_s,
      };

      const token = await Token.create(tokenobj, { transaction: t });

      if (!token) {
        throw new Error('Some error occurred while creating the Token.');
      }

      const result_email = await nodemailer.sendConfirmationEmail(user, token, req);

      if (!result_email) {
        throw new Error('Some error occurred while sending the email.');
      }

      return user;
    });
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
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

exports.getUserByPersonId = (req, res) => {
  const personId = req.params.id;
  if (!personId) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  
  AppUser.findOne({ where: { PersonId: personId }, attributes: { exclude: ['DocumentTypeId', 'PersonTypeId', 'CreatedDate'] } })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ error: 'Invalid Document' });
      }

      return res.status(200).send(user);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Some error occurred while searching the Person.',
      });
    });
  
};

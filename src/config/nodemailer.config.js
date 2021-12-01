const nodemailer = require('nodemailer');
const config = require('./config');

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: user,
    pass: pass,
  },
});

exports.sendConfirmationEmail = (name, email, token, req) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
        <a href=${req.protocol}://${req.get('host')}/auth/confirm/${token}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

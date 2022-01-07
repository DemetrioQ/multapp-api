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

exports.sendConfirmationEmail = async (dataUser, dataToken, req) => {
  return new Promise((resolve, reject)=>{
    transport
      .sendMail({
        from: config.user,
        to: dataUser.Email,
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
                <h2>Hello ${dataUser.Username}</h2>
                <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
                <a href=${req.protocol}://${req.get('host')}/auth/confirm/${dataToken.Token}> Click here</a>
                </div>`,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  })
  
};

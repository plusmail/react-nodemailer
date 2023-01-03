var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/config');

var transport = {
  service : 'Naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${content} `

  var mail = {
    from: creds.USER,
    to: email,  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }
  console.log("222->", mail);

  transporter.sendMail(mail, (err, data) => {

    console.log("111->", err);
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;

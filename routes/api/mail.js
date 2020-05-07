const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

let transporter = nodemailer.createTransport({
  host: config.get('mailHost'),
  port: 587,
  secure: false, // use TLS
  auth: {
    user: config.get('mailUser'),
    pass: config.get('mailPass'),
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

function randomPassword(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// @route   POST api/mail
// @desc    Send password reset
// @access  Public
router.post(
  '/reset',
  [check('email', 'Please include a valid email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;

      // See if user exists
      let user = await User.findOne({ email });
      const newPassword = randomPassword(6);

      // Save reset password:
      user.reset = newPassword;
      await user.save();

      if (user === null) {
        return res.status(400).json({ errors: [{ msg: 'Email not found' }] });
      } else {
        let mailOptions = {
          from: config.get('mailUser'),
          to: email,
          subject: 'Climate Hub - Password Request',
          html:
            'Hi ' +
            user.name +
            ', <p>We received a password reset request for your account</p> <p><a href=http://localhost:3000/reset-password/' +
            newPassword +
            ">Click here to reset your password</a></p><p>If you didn't request a new password, you may ignore this email.</p>" +
            '<p>This link will only be active until you change your password.</p>',
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.status(500).send('Server error');
          } else {
            // console.log('Email sent: ' + info.response);
            res.json(info);
          }
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

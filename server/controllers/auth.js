const User = require("../models/user");
const mysqlUser = require("../models/mysqlUsers");
const crypto = require('crypto');

exports.signup = (req, res) => {
  // console.log('REQ BODY ON SIGNUP', req.body);
  const { name, email, password } = req.body;
  const salt = function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
}
const encryptPassword = function() {
    let password = req.body.password;
    console.log('passs', this.salt);
    
    if (!password) return '';
    try {
        return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
    } catch (err) {
        return '';
    }
}
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const szymon = 'random';
  // Create a Customer
  const newUser = new mysqlUser({
    email: req.body.email,
    role: 'subscriber',
    name: req.body.name,
    salt: salt(),
    password: function() {
        let password = req.body.password;
        console.log('passs', this.salt);
        
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            console.log('errror', err);
            return '';
        }
    }
  });

  // Save User in the database
  mysqlUser.create(newUser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else res.send(data);
  });

  // User.findOne({ email }).exec((err, user) => {
  //     if (user) {
  //         return res.status(400).json({
  //             error: 'Email is taken'
  //         });
  //     }
  // });

  // let newUser = new User({ name, email, password });

  // newUser.save((err, success) => {
  //     if (err) {
  //         console.log('SIGNUP ERROR', err);
  //         return res.status(400).json({
  //             error: err
  //         });
  //     }
  //     res.json({
  //         message: 'Signup success! Please signin'
  //     });
  // });
};

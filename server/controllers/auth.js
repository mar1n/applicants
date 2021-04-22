const User = require("../models/user");
const mysqlUser = require("../models/mysqlUsers");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// exports.signup = (req, res) => {
//   // console.log('REQ BODY ON SIGNUP', req.body);
//   const { name, email, password } = req.body;
//   mysqlUser.findById(email, (err, data) => {

//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found User with email ${email}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving User with email " + email
//         });
//       }
//     } else res.send(data);
//   });

// //   const salt = function () {
// //     return Math.round(new Date().valueOf() * Math.random()) + "";
// //   };
// //   // Validate request
// //   if (!req.body) {
// //     res.status(400).send({
// //       message: "Content can not be empty!",
// //     });
// //   }
// //   // Create a User
// //   const newUser = new mysqlUser({
// //     email: req.body.email,
// //     role: "subscriber",
// //     name: req.body.name,
// //     salt: salt(),
// //     password: function () {
// //       let password = req.body.password;
// //       console.log("passs", this.salt);

// //       if (!password) return "";
// //       try {
// //         return crypto
// //           .createHmac("sha1", this.salt)
// //           .update(password)
// //           .digest("hex");
// //       } catch (err) {
// //         console.log("errror", err);
// //         return "";
// //       }
// //     },
// //   });

// //   // Save User in the database
// //   mysqlUser.create(newUser, (err, data) => {
// //     if (err)
// //       res.status(500).send({
// //         message:
// //           err.message || "Some error occurred while creating the Customer.",
// //       });
// //     else res.send(data);
// //   });

//   // User.findOne({ email }).exec((err, user) => {
//   //     if (user) {
//   //         return res.status(400).json({
//   //             error: 'Email is taken'
//   //         });
//   //     }
//   // });

//   // let newUser = new User({ name, email, password });

//   // newUser.save((err, success) => {
//   //     if (err) {
//   //         console.log('SIGNUP ERROR', err);
//   //         return res.status(400).json({
//   //             error: err
//   //         });
//   //     }
//   //     res.json({
//   //         message: 'Signup success! Please signin'
//   //     });
//   // });
// };

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account activation link`,
            html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        };

        sgMail
            .send(emailData)
            .then(sent => {
                // console.log('SIGNUP EMAIL SENT', sent)
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                });
            })
            .catch(err => {
                // console.log('SIGNUP EMAIL SENT ERROR', err)
                return res.json({
                    message: err.message
                });
            });
    });
};

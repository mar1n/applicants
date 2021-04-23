const User = require("../models/user");
const mysqlUser = require("../models/mysqlUsers");
const Applicant = require("../models/mysqlApplicants");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
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

  mysqlUser.findById(email, (err, data) => {
    if (data) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    // if (err) {
    //   if (err.kind === "not_found") {
    //     res.status(404).send({
    //       message: `Not found User with email ${email}.`
    //     });
    //   } else {
    //     res.status(500).send({
    //       message: "Error retrieving User with email " + email
    //     });
    //   }
    // } else res.send(data);
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

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
                `,
    };

    sgMail
      .send(emailData)
      .then((sent) => {
        // console.log('SIGNUP EMAIL SENT', sent)
        return res.json({
          message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
        });
      })
      .catch((err) => {
        // console.log('SIGNUP EMAIL SENT ERROR', err)
        return res.json({
          message: err.message,
        });
      });
  });

  // User.findOne({ email }).exec((err, user) => {
  //     if (user) {
  //         return res.status(400).json({
  //             error: 'Email is taken'
  //         });
  //     }

  // });
};

exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
          return res.status(401).json({
            error: "Expired link. Signup again",
          });
        }

        const { name, email, password } = jwt.decode(token);
        var passwordToken = password;
        const salt = function () {
          return Math.round(new Date().valueOf() * Math.random()) + "";
        };
        // Validate request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!",
          });
        }
        // Create a User
        const newUser = new mysqlUser({
          email: email,
          role: "subscriber",
          name: name,
          salt: salt(),
          password: function () {
            let password = passwordToken;
            console.log("passs", this.salt);

            if (!password) return "";
            try {
              return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
            } catch (err) {
              console.log("errror", err);
              return "";
            }
          },
        });

        // Save User in the database
        mysqlUser.create(newUser, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Customer.",
            });
          return res.json({
            message: "Signup success. Please signin.",
          });
        });
        // const user = new User({ name, email, password });

        // user.save((err, user) => {
        //   if (err) {
        //     console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
        //     return res.status(401).json({
        //       error: "Error saving user in database. Try signup again",
        //     });
        //   }
        //   return res.json({
        //     message: "Signup success. Please signin.",
        //   });
        // });
      }
    );
  } else {
    return res.json({
      message: "Something went wrong. Try again.",
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  mysqlUser.findById(email, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    console.log("hashed password", user.hashed_password);
    const encryptPassword = function (password) {
      if (!password) return "";
      try {
        return crypto
          .createHmac("sha1", user.salt)
          .update(password)
          .digest("hex");
      } catch (err) {
        return "";
      }
    };

    // Authenticate
    if (!(encryptPassword(password) === user.hashed_password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
      console.log("win");
    }
    //generate a token and send to client
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { id, name, email, role } = user;

    return res.json({
      token,
      user: { id, name, email, role },
    });
  });
  // User.findOne({ email }).exec((err, user) => {
  //     if (err || !user) {
  //         return res.status(400).json({
  //             error: 'User with that email does not exist. Please signup'
  //         });
  //     }
  //     // authenticate
  //     if (!user.authenticate(password)) {
  //         return res.status(400).json({
  //             error: 'Email and password do not match'
  //         });
  //     }
  //     // generate a token and send to client
  //     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  //     const { _id, name, email, role } = user;

  //     return res.json({
  //         token,
  //         user: { _id, name, email, role }
  //     });
  // });
};

exports.createApplicant = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const applicant = new Applicant({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    DateOfBirth: req.body.DateOfBirth,
    PhoneNo: req.body.PhoneNo,
  });

  // Save Customer in the database
  Applicant.create(applicant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

exports.getAllApplicants = (req, res) => {
  const { name, email, password } = req.body;
  Applicant.getAll((err, data) => {

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with email ${email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + email
        });
      }
    } else res.send(data);
  });
}

exports.deleteApplicant = (req, res) => {
  Applicant.remove(req.params.applicantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Applicant with id ${req.params.applicantId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Applicant with id " + req.params.applicantId
        });
      }
    } else res.send({ message: `Applicant was deleted successfully!` });
  });
};

exports.findApplicant = (req, res) => {
  Applicant.findById(req.params.applicantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Applicant with id ${req.params.applicantId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.ApplicantId
        });
      }
    } else res.send(data);
  });
};

exports.updateApplicant = (req, res) => {
  console.log('id', req.params.applicantId)
  console.log('body',req.body)
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Applicant.updateById(
    req.params.applicantId,
    new Applicant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Applicant with id ${req.params.applicantId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Applicant with id " + req.params.applicantId
          });
        }
      } else res.send(data);
    }
  );
};
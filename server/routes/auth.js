const express = require('express');
const router = express.Router();

// import controller
const { signup, accountActivation, signin, createApplicant, getAllApplicants, deleteApplicant, findApplicant, updateApplicant } = require('../controllers/auth');

// import validators
const { userSignupValidator, userSigninValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator, runValidation, signin);
router.post('/createApplicant', createApplicant);
router.get('/getAllApplicants', getAllApplicants);
router.delete('/deleteApplicant/:applicantId', deleteApplicant);
router.get('/findApplicant/:applicantId', findApplicant);
router.put('/updateApplicant/:applicantId', updateApplicant);

module.exports = router;
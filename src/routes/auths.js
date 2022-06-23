const express = require('express')
const {
  // admin
  signUpAdminAccount,
  signInAdminAccount,

  // student
  signUpStudentAccount,
  signInStudentAccount,
} = require('../controllers/auths')

// mustBeAdmin
const mustBeAdmin = require('../middlewares/mustBeAdmin')

const router = express.Router()

// default admin login
// username: admin
// username: 123456789

// POST         127.0.0.1:3333/auths/admin-signup?token= - administrator signup
router.route('/admin-signup').post(mustBeAdmin, signUpAdminAccount)

// POST         127.0.0.1:3333/auths/admin-signin - administrator signin
router.route('/admin-signin').post(signInAdminAccount)

// POST         127.0.0.1:3333/auths/student-signup?token= - student signup
router.route('/student-signup').post(mustBeAdmin, signUpStudentAccount)

// POST         127.0.0.1:3333/auths/student-signin - student signin
router.route('/student-signin').post(signInStudentAccount)

module.exports = router

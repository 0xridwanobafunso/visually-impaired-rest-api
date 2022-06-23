const express = require('express')
const {
  getStudentAccounts,
  getAdminAccounts,
} = require('../controllers/accounts')

const router = express.Router()

// mustBeAdmin
const mustBeAdmin = require('../middlewares/mustBeAdmin')

// GET          127.0.0.1:3333/accounts/admin?token=   - get admins by admin
router.route('/admin').get(mustBeAdmin, getAdminAccounts)

// GET          127.0.0.1:3333/accounts/student?token=  - get students by admin
router.route('/student').get(mustBeAdmin, getStudentAccounts)

module.exports = router

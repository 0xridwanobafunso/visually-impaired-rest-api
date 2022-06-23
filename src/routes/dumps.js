const express = require('express')
const { dumpAdminLogin } = require('../controllers/dumps')

const router = express.Router()

// GET          127.0.0.1:3333/dumps/default-admin  - dump default admin login credentials
router.route('/default-admin').get(dumpAdminLogin)

module.exports = router

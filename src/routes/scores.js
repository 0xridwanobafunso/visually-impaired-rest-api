const express = require('express')
const { getScores, getUserAttempts } = require('../controllers/scores')

const router = express.Router()

// mustBeAdmin
const mustBeAdmin = require('../middlewares/mustBeAdmin')

// GET          127.0.0.1:3333/scores/student?token=  - get scores by admin
// GET          127.0.0.1:3333/scores/student/:id/attempts?token  - get total attempts score by admin
router.route('/student').get(mustBeAdmin, getScores)
router.route('/student/:id/attempts').get(mustBeAdmin, getUserAttempts)

module.exports = router

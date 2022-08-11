const express = require('express')
const { searchResult } = require('../controllers/search')

const router = express.Router()

// GET          127.0.0.1:3333/search/result  - search result
router.route('/result').get(searchResult)

module.exports = router

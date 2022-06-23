const express = require('express')
const {
  addQuestion,
  getQuestions,
  getQuestion,
  editQuestion,
  deleteQuestion,
  getExamQuestions,
  submitExamQuestionsAnswers,
} = require('../controllers/questions')

const router = express.Router()

// mustBeAdmin
const mustBeAdmin = require('../middlewares/mustBeAdmin')

// mustBeStudent
const mustBeStudent = require('../middlewares/mustBeStudent')

// GET          127.0.0.1:3333/questions/admin?token=  - get questions by admin
// POST         127.0.0.1:3333/questions/admin?token= - add question by admin
router
  .route('/admin')
  .get(mustBeAdmin, getQuestions)
  .post(mustBeAdmin, addQuestion)

// GET         127.0.0.1:3333/questions/:id/admin?token=  - get a question by admin
// PUT          127.0.0.1:3333/questions/:id/admin?token=  - update question by admin
// DELETE       127.0.0.1:3333/questions/:id/admin?token= - delete question by admin
router
  .route('/:id/admin')
  .get(mustBeAdmin, getQuestion)
  .put(mustBeAdmin, editQuestion)
  .delete(mustBeAdmin, deleteQuestion)

// GET          127.0.0.1:3333/questions/student?token=&total=
// POST         127.0.0.1:3333/questions/student?token=
router
  .route('/student')
  .get(mustBeStudent, getExamQuestions)
  .post(mustBeStudent, submitExamQuestionsAnswers)

module.exports = router

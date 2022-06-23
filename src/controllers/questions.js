const Question = require('../models/Question')
const Score = require('../models/Score')
const getGrade = require('../helpers/getGrade')

// NOTE:-
// the controllers below requires ADMIN priviledge

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.addQuestion = async (req, res, next) => {
  let { question, option_a, option_b, option_c, option_d, answer } = req.body

  // autheticated admin username
  let { username } = req.admin.data

  if ([question, option_a, option_b, option_c, option_d, answer].includes('')) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'all fields are required' },
      code: 422,
    })
  }

  let _question = await Question.create({
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    answer,
    added_by: username,
  })

  return res.status(201).json({
    success: true,
    data: { message: 'question added successfully', question: _question },
    error: {},
    code: 201,
  })
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getQuestions = async (req, res, next) => {
  let questions = await Question.findAll({ order: [['id', 'DESC']] })

  if (questions.length == 0) {
    return res.status(200).json({
      success: false,
      data: {},
      error: { message: 'there is no questions yet' },
      code: 200,
    })
  }

  return res.status(200).json({
    success: true,
    data: { message: 'questions retrieved successfully', questions },
    error: {},
    code: 200,
  })
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getQuestion = async (req, res, next) => {
  let question = await Question.findAll({ where: { id: req.params.id } })

  if (!question) {
    return res.status(200).json({
      success: false,
      data: {},
      error: { message: 'question not found' },
      code: 200,
    })
  }

  return res.status(200).json({
    success: true,
    data: { message: 'question retrieved successfully', question },
    error: {},
    code: 200,
  })
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.editQuestion = async (req, res, next) => {
  let _question = await Question.findOne({ where: { id: req.params.id } })

  if (!_question) {
    return res.status(404).json({
      success: false,
      data: {},
      error: { message: 'question not found' },
      code: 404,
    })
  }

  let { question, option_a, option_b, option_c, option_d, answer } = req.body

  _question.question = question
  _question.option_a = option_a
  _question.option_b = option_b
  _question.option_c = option_c
  _question.option_d = option_d
  _question.answer = answer

  _question.save()

  return res.status(200).json({
    success: true,
    data: { message: 'question edited successfully', question: _question },
    error: {},
    code: 200,
  })
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.deleteQuestion = async (req, res, next) => {
  let _question = await Question.findOne({ where: { id: req.params.id } })

  if (!_question) {
    return res.status(404).json({
      success: false,
      data: {},
      error: { message: 'question not found' },
      code: 404,
    })
  }

  _question.destroy()

  return res.status(200).json({
    success: true,
    data: { message: 'question deleted successfully', question: {} },
    error: {},
    code: 200,
  })
}

// NOTE:-
// the controllers below requires student priviledge

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getExamQuestions = async (req, res, next) => {
  let questions = await Question.findAll({ order: [['id', 'DESC']] })
  let { total } = req.query

  if (!req.query.total) total = 60

  if (questions.length == 0) {
    return res.status(200).json({
      success: false,
      data: {},
      error: { message: 'there is no questions yet' },
      code: 200,
    })
  }

  // shuffle all questions and select the first 'total' in the array
  questions = questions.sort(() => Math.random() - 0.5)
  questions = questions.filter((question, idx) => idx < total)

  return res.status(200).json({
    success: true,
    data: { message: 'questions retrieved successfully', questions },
    error: {},
    code: 200,
  })
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.submitExamQuestionsAnswers = async (req, res, next) => {
  // sample payload for answers
  // [
  //   { question_id: '6', answer: 'c' },
  //   { question_id: '3', answer: 'b' },
  //   { question_id: '1', answer: 'b' }
  // ]

  let questions = await Question.findAll({ order: [['id', 'DESC']] })
  let answers = req.body
  let score = 0

  // autheticated student id
  let { id } = req.student.data

  if (
    typeof answers === 'object' &&
    !Array.isArray(answers) &&
    answers !== null
  ) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'please provide array of answers' },
      code: 422,
    })
  }

  if (answers.length == 0) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'question answers cannot be empty' },
      code: 422,
    })
  }

  if (questions.length == 0) {
    return res.status(200).json({
      success: false,
      data: {},
      error: {
        message:
          'administrators has not created any questions to check answers against',
      },
      code: 200,
    })
  }

  for (let _answer of answers) {
    let question = questions.find(
      (_question) => _question.id == _answer.question_id
    )

    if (question.answer == _answer.answer) score++
  }

  // submit scores
  await Score.create({
    account_id: id,
    score,
    grade: getGrade(Math.round((score / answers.length) * 100)),
  })

  return res.status(201).json({
    success: true,
    data: {
      message: 'your score has been submitted successfully',
      question: {},
    },
    error: {},
    code: 201,
  })
}

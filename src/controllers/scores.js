const Account = require('../models/Account')
const Score = require('../models/Score')

// NOTE:-
// the controllers below requires ADMIN priviledge

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getScores = async (req, res, next) => {
  let scores = await Score.findAll({ order: [['id', 'DESC']] })
  let _scores = []

  if (scores.length == 0) {
    return res.status(200).json({
      success: false,
      data: {},
      error: { message: 'there is no scores yet' },
      code: 200,
    })
  }

  for (let _score of scores) {
    let account = await Account.findOne({
      where: { id: _score.account_id },
      attributes: ['id', 'username', 'created_at', 'updated_at'],
    })

    _scores.push({
      account,
      score: _score.score,
      grade: _score.grade,
    })
  }

  return res.status(200).json({
    success: true,
    data: { message: 'scores retrieved successfully', scores: _scores },
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
exports.getUserAttempts = async (req, res, next) => {
  let scores = await Score.findAll({
    where: { account_id: req.params.id },
    order: [['id', 'DESC']],
  })
  let _scores = []

  console.log(scores.length)

  if (scores.length == 0) {
    return res.status(200).json({
      success: false,
      data: {},
      error: { message: 'there is no scores for this student yet' },
      code: 200,
    })
  }

  for (let _score of scores) {
    let account = await Account.findOne({
      where: { id: _score.account_id },
      attributes: ['id', 'username', 'created_at', 'updated_at'],
    })

    _scores.push({
      account,
      score: _score.score,
      grade: _score.grade,
    })
  }

  return res.status(200).json({
    success: true,
    data: {
      message: 'scores retrieved successfully',
      scores: _scores,
      total_attempt: _scores.length,
    },
    error: {},
    code: 200,
  })
}

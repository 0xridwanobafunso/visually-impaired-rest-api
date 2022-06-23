const Account = require('../models/Account')

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAdminAccounts = async (req, res, next) => {
  let accounts = await Account.findAll({
    where: { role: 'admin' },
    order: [['id', 'DESC']],
  })

  if (accounts.length == 0) {
    return res.status(200).json({
      success: false,
      data: {},
      error: { message: 'there is no administrator yet' },
      code: 200,
    })
  }

  return res.status(200).json({
    success: true,
    data: { message: 'administrators retrieved successfully', accounts },
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
exports.getStudentAccounts = async (req, res, next) => {
  let accounts = await Account.findAll({
    where: { role: 'student' },
    order: [['id', 'DESC']],
  })

  if (accounts.length == 0) {
    return res.status(200).json({
      success: false,
      data: {},
      error: { message: 'there is no student yet' },
      code: 200,
    })
  }

  return res.status(200).json({
    success: true,
    data: { message: 'students retrieved successfully', accounts },
    error: {},
    code: 200,
  })
}

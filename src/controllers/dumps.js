const Account = require('../models/Account')
const bcrypt = require('bcrypt')

// dump default admin login
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.dumpAdminLogin = async (req, res, next) => {
  let username = 'admin'
  let password = '123456789'

  // check if username is available for admin
  let account = await Account.findOne({ where: { username, role: 'admin' } })

  if (account) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'username has been taken by another administrator' },
      code: 422,
    })
  }

  // hash password
  const hashedPassword = await bcrypt.hashSync(password, 10)

  // create admin account here
  account = await Account.create({
    username,
    password: hashedPassword,
    role: 'admin',
  })

  return res.status(201).json({
    success: true,
    data: { message: 'admin account dumped successfully', account },
    error: {},
    code: 201,
  })
}

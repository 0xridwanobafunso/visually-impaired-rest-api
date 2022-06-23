const Account = require('../models/Account')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

// load env vars
dotenv.config({ path: __dirname + '/.env' })

// environment variable
const { JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRESIN } = process.env

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.signUpAdminAccount = async (req, res, next) => {
  let { username, password } = req.body

  // username and password are required
  if ([username, password].includes('')) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'username and password are required' },
      code: 422,
    })
  }

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
    ...req.body,
    password: hashedPassword,
    role: 'admin',
  })

  return res.status(201).json({
    success: true,
    data: { message: 'admin account created successfully', account },
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
exports.signInAdminAccount = async (req, res, next) => {
  let { username, password } = req.body

  // username and password are required
  if ([username, password].includes('')) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'username and password are required' },
      code: 422,
    })
  }

  let account = await Account.findOne({ where: { username, role: 'admin' } })

  if (!account || !(await bcrypt.compare(password, account.password))) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'username and password not match' },
      code: 422,
    })
  }

  let token = await sign(
    {
      id: account.id,
      username: account.username,
      role: 'admin',
    },
    JWT_SECRET,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn: JWT_EXPIRESIN,
    }
  )

  let expiresIn =
    new Date().getTime() + JWT_EXPIRESIN.slice(0, -1) * 60 * 60 * 1000

  return res.status(200).json({
    success: true,
    data: {
      message: 'admin sign in successfully',
      token: { _token: token, _expiresIn: expiresIn },
    },
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
exports.signUpStudentAccount = async (req, res, next) => {
  let { username, password } = req.body

  // username and password are required
  if ([username, password].includes('')) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'username and password are required' },
      code: 422,
    })
  }

  // check if username is available for student
  let account = await Account.findOne({ where: { username, role: 'student' } })

  if (account) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'username has been taken by another student' },
      code: 422,
    })
  }

  // hash password
  const hashedPassword = await bcrypt.hashSync(password, 10)

  // create student account here
  account = await Account.create({
    ...req.body,
    password: hashedPassword,
    role: 'student',
  })

  return res.status(201).json({
    success: true,
    data: { message: 'student account created successfully', account },
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
exports.signInStudentAccount = async (req, res, next) => {
  let { username, password } = req.body

  // username and password are required
  if ([username, password].includes('')) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'username and password are required' },
      code: 422,
    })
  }

  let account = await Account.findOne({ where: { username, role: 'student' } })

  if (!account || !(await bcrypt.compare(password, account.password))) {
    return res.status(422).json({
      success: false,
      data: {},
      error: { message: 'username and password not match' },
      code: 422,
    })
  }

  let token = await sign(
    {
      id: account.id,
      username: account.username,
      role: 'student',
    },
    JWT_SECRET,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn: JWT_EXPIRESIN,
    }
  )

  let expiresIn =
    new Date().getTime() + JWT_EXPIRESIN.slice(0, -1) * 60 * 60 * 1000

  return res.status(200).json({
    success: true,
    data: {
      message: 'student sign in successfully',
      token: { _token: token, _expiresIn: expiresIn },
    },
    error: {},
    code: 200,
  })
}

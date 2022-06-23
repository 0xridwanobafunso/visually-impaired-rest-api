const dotenv = require('dotenv')
const { verify } = require('jsonwebtoken')

// load env vars
dotenv.config({ path: __dirname + '/.env' })

// environment variable
const { JWT_SECRET } = process.env

const mustBeAdmin = async (req, res, next) => {
  try {
    let token

    if (req.query.token) token = req.query.token

    if (!token) {
      return res.status(401).json({
        success: false,
        data: {},
        errors: { message: "You're not authorized to access this endpoint" },
        code: 401,
      })
    }

    let account = await verify(token, JWT_SECRET)

    if (account.role != 'admin') {
      return res.status(401).json({
        success: false,
        data: {},
        errors: { message: "You're not authorized to access this endpoint" },
        code: 401,
      })
    }

    req.admin = {
      data: account,
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = mustBeAdmin

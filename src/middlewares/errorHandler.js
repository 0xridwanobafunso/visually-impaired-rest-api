const errorHandler = (err, req, res, next) => {
  let data = {}
  let error = { message: 'Server Error' }
  let code = 500

  // success: false,
  // data: {},
  // error: { message: 'there is no student yet' },
  // code: 200,

  if (err) {
    if (err.message == 'No auth token') {
      error.message = 'you are not authorize to access this protected route'
      code = 401
    } else if (err.name == 'JsonWebTokenError') {
      if (err.message == 'invalid signature') {
        error.message = 'invalid session token provided'
        code = 401
      }

      if (err.message == 'jwt malformed') {
        error.message = 'invalid session token provided'
        code = 401
      }
    } else if (err.message == 'Missing credentials') {
      error.message = 'missing credentials'
      code = 400
    }
  }

  res.status(code).json({ success: false, data: {}, error, code })
}

module.exports = errorHandler

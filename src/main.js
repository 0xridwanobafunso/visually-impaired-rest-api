const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
require('colors')

// load env vars
dotenv.config({ path: __dirname + '/.env' })

// routes
const dumps = require('./routes/dumps')
const accounts = require('./routes/accounts')
const auths = require('./routes/auths')
const questions = require('./routes/questions')
const scores = require('./routes/scores')

// middlewares
const errorHandler = require('./middlewares/errorHandler')

// destructure env vars
let { APP_PORT } = process.env

// create express application
const app = express()

// to attach real IP address of visitor even behind a load balancer like Nginx
app.set('trust proxy', 1)

// morgan middleware for logging request
app.use(
  morgan(
    '[:date] ":method :url HTTP/:http-version" :status ":user-agent"'.yellow
      .bold
  )
)

// cors middleware to enable cross origin resource sharing(cors)
app.use(cors({ origin: true }))

// parse incoming data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
  return res.json({
    success: true,
    data: {
      message: 'Voice-based Exam REST API up and running',
    },
    code: 200,
  })
})

// use routes
app.use('/dumps', dumps)
app.use('/auths', auths)
app.use('/accounts', accounts)
app.use('/questions', questions)
app.use('/scores', scores)

// global error handler
app.use(errorHandler)

const server = app.listen(APP_PORT, (error) => {
  if (error) console.error('error starting up server'.red.bold)

  console.log('[+] server is up and running at 127.0.0.1:3333'.green.bold)
})

process.on('unhandledRejection', (err, promise) => {
  // console.log(err.name)
  // console.log(err.message)
  // console.log(err.errors)
  if (err) {
    console.log(`Error: ${err.message}`.red.underline.bold)

    // close server when promise rejection is not handled
    server.close(() => {
      console.log(`server has been closed successfully`.red.bold)
    })
  }
})

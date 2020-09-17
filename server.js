const express = require('express')
const passport = require('passport')
const cors = require('cors')
const ConnectDB = require('./config/db')
const path = require('path')

// Connect to database
ConnectDB()

const app = express()

app.use(express.json({ extended: false }))
app.use(passport.initialize())
app.use(cors())

app.use('/api/users', require('./routes/user'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server started')
})

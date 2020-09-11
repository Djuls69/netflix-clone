const express = require('express')
const cors = require('cors')
const ConnectDB = require('./config/db')

// Connect to database
ConnectDB()

const app = express()

app.use(express.json({ extended: false }))
app.use(cors())

app.use('/api/users', require('./routes/user'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server started')
})

const mongoose = require('mongoose')
const config = require('config')
const mongoUri = config.get('MONGO_URI')

const ConnectDB = async () => {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to database')
  })
}

module.exports = ConnectDB

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  googleID: {
    type: String
  },
  facebookID: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  profils: [
    {
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      }
    }
  ]
})

module.exports = User = mongoose.model('user', userSchema)

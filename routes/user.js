const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const secretToken = config.get('SECRET_TOKEN')

// Register user
// POST /api/users
// Public
router.post('/', [body('email').isEmail(), body('password').isLength({ min: 6 })], async (req, res) => {
  const { email, password } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(403).send('Email déjà existante')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = await User({ email, password: hashedPassword }).save()

    const payload = {
      user: {
        id: user.id
      }
    }

    const token = jwt.sign(payload, secretToken, { expiresIn: 60 * 60 * 24 })
    return res.json({ token })
  } catch (err) {
    return res.status(500).send('Erreur serveur')
  }
})

// Login user
// POST /api/users/login
// Public
router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 6 })], async (req, res) => {
  const { email, password } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).send('Identifiants incorrects')
    }

    const decrypted = await bcrypt.compare(password, user.password)
    if (!decrypted) {
      return res.status(404).send('Identifiants incorrects')
    }

    const payload = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(payload, secretToken, { expiresIn: 60 * 60 * 24 })
    return res.json({ token })
  } catch (err) {
    return res.status(500).send('Erreur serveur')
  }
})

module.exports = router

const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const secretToken = config.get('SECRET_TOKEN')
const auth = require('../middlewares/auth')

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

// Load user
// GET /api/users
// Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).send('Utilisateur introuvable')
    }
    return res.json(user)
  } catch (err) {
    console.log(err.message)
  }
})

// Add user profile
// POST /api/users/profile
// Private
router.post('/profile', [auth, [body('name').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).send('Utilisateur introuvable')
    }

    if (user.profiles.length > 2) {
      return res.status(403).send('2 profils maximum')
    }

    const newProfile = { name: req.body.name, avatar: '' }
    if (user.profiles.length === 0) {
      newProfile.avatar =
        'https://occ-0-56-55.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABSLII-o6GmYPFo09Nlv7D5jVLJGKsBJnZFzFAj82yk-WfGl7mV_vbCPIK5h65iTgGTs1dobHjU5Nlwc0EwKaty5KYhoV.png'
    } else if (user.profiles.length > 0) {
      newProfile.avatar =
        'https://occ-0-56-55.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABYCq-HPaBmwWzyEo8UjC3jQ7a2mKJhU4uPbQwFrauKbu9_-6GpfPccnQh3UWZvsGLQ1MwLo_4YZ-kuTiAsqpq0oEdPXS.png'
    }

    user.profiles.push(newProfile)
    await user.save()
    return res.json(user)
  } catch (err) {
    console.log(err.message)
  }
})

module.exports = router

const express = require('express')
const router = express.Router()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const config = require('config')
const clientIDFacebook = config.get('FACEBOOK_CLIENT_ID')
const clientSecretFacebook = config.get('FACEBOOK_CLIENT_SECRET')
const secretToken = config.get('SECRET_TOKEN')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { createProxyMiddleware } = require('http-proxy-middleware')

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

// FACEBOOK
passport.use(
  new FacebookStrategy(
    {
      clientID: clientIDFacebook,
      clientSecret: clientSecretFacebook,
      callbackURL: 'http://localhost:5000/api/auth/facebook/callback',
      profileFields: ['id', 'email']
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ facebookID: profile.id })
        if (user) {
          const payload = {
            user: {
              id: user.id
            }
          }
          const token = jwt.sign(payload, secretToken, { expiresIn: 60 * 60 * 24 })
          console.log({ token })
          return cb(null, { token })
        } else if (!user) {
          await User({
            facebookID: profile.id,
            email: profile.emails[0].value
          }).save()
          const payload = {
            user: {
              id: user.id
            }
          }
          const token = jwt.sign(payload, secretToken, { expiresIn: 60 * 60 * 24 })
          console.log({ token })
          return cb(null, { token })
        }
      } catch (err) {
        console.log(err.message)
      }
    }
  )
)

router.get('/auth/facebook', passport.authenticate('facebook'))
router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => res.send('Success'))

module.exports = router

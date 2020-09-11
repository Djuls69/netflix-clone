const jwt = require('jsonwebtoken')
const config = require('config')
const secretToken = config.get('SECRET_TOKEN')

module.exports = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(403).send('Opération non autorisée')
  }

  jwt.verify(token, secretToken, (err, decoded) => {
    if (err) {
      return res.status(403).send('Token invalide')
    }
    return (req.user = decoded.user)
  })
  next()
}

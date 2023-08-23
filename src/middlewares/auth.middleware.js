const jwt = require('jsonwebtoken')
const getToken = require('../helpers/get-token')

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Não autenticado' })
  }

  const token = getToken(req)

  if (!token) {
    return res.status(401).json({ message: 'Não autenticado' })
  }

  try {
    const verified = jwt.verify(token, 'secret')
    if (!verified) {
      return res.status(401).json({ message: 'Não autenticado' })
    }
    req.user = verified
    next()
  } catch (error) {
    return res.status(400).json({ message: 'Token invalido' })
  }
}

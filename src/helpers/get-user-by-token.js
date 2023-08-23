const User = require('../models/User')
const jwt = require('jsonwebtoken')

const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: 'Não autenticado' })
  }

  const userData = jwt.verify(token, 'secret')
  const user = await User.findById(userData.id)

  return user
}

module.exports = getUserByToken

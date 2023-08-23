const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {
  user.emailToken = undefined
  const token = jwt.sign(
    {
      user: user.name,
      id: user._id,
    },
    'secret',
  )
  res.status(200).json({
    token,
    user,
  })
}

module.exports = createUserToken

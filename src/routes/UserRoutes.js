const UserController = require('../controllers/UserController')
const AuthMiddlewere = require('../middlewares/auth.middleware')

module.exports = (app) => {
  app.post('/users/register', UserController.register)
  app.post('/users/login', UserController.login)
  app.get('/users/checkUser', UserController.checkUser)
  app.post('/users/validation-email', UserController.validationEmail)
  app.post('/users/forgot-password', UserController.forgotPassword)
  app.post('/users/reset-password', UserController.resetPassword)
  app.get('/users/:id', AuthMiddlewere, UserController.getUserById)
  app.patch('/users/edit', AuthMiddlewere, UserController.editUserById)
  app.delete('/users/:id', AuthMiddlewere, UserController.deleteUser)
}

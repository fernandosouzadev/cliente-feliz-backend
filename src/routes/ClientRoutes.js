const ClientController = require('../controllers/ClientController')
const AuthMiddlewere = require('../middlewares/auth.middleware')

module.exports = (app) => {
  app.post('/client', AuthMiddlewere, ClientController.register)
  app.get('/client', AuthMiddlewere, ClientController.getAll)
  app.get('/client/:id', AuthMiddlewere, ClientController.getById)
  app.get('/client/search/:key', AuthMiddlewere, ClientController.search)
  app.patch('/client/:id', AuthMiddlewere, ClientController.editById)
  app.delete('/client/:id', AuthMiddlewere, ClientController.deleteById)
}

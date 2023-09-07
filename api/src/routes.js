const { Router, request } = require('express');

/*
const { CustomerController } = require('./controllers/customer');
const { UserController } = require('./controllers/user');
const { authMiddleware } = require('./middleware/auth-middleware');*/

//IMPORTANDO OS CONTROLLERS
const { OcorrenciaController } = require('./controllers/ocorrencia');
const { PolicialController } = require('./controllers/policial');
const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

/*
const customerController = new CustomerController();
const userController = new UserController(); 

routes.post('/customer', authMiddleware, customerController.create);
routes.get('/customers', authMiddleware, customerController.getAll);
routes.delete('/customer/:id', authMiddleware, customerController.delete);
routes.put('/customer/:id', authMiddleware, customerController.update);

routes.post('/register', userController.register);
routes.post('/login', userController.login);*/

const ocorrenciaController = new OcorrenciaController();
const policialController = new PolicialController();

routes.post('/registrar-ocorrencia', authMiddleware, ocorrenciaController.create);
routes.get('/ocorrencias', authMiddleware, ocorrenciaController.getAll);
routes.put('/atualizar-ocorrencia/:id', authMiddleware, ocorrenciaController.update);
routes.delete('/ocorrencia/:id', authMiddleware, ocorrenciaController.delete);

routes.post('/cadastro', policialController.register);
routes.post('/login', policialController.login);

module.exports = { routes };
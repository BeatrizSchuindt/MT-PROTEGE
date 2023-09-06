const { Router, request } = require('express');

/*
const { CustomerController } = require('./controllers/customer');
const { UserController } = require('./controllers/user');
const { authMiddleware } = require('./middleware/auth-middleware');*/

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

module.exports = { routes };
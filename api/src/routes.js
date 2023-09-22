const { Router, request } = require('express');

//IMPORTANDO OS CONTROLLERS
const { OcorrenciaController } = require('./controllers/ocorrencia');
const { PolicialController } = require('./controllers/policial');
const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

const ocorrenciaController = new OcorrenciaController();
const policialController = new PolicialController();

routes.post('/registrar-ocorrencia', authMiddleware, ocorrenciaController.create);
routes.get('/ocorrencias', authMiddleware, ocorrenciaController.getAll);
routes.post('/ocorrencias/filtro', authMiddleware, ocorrenciaController.getFilter);
routes.put('/atualizar-ocorrencia/:id', authMiddleware, ocorrenciaController.update);
routes.delete('/ocorrencia/:id', authMiddleware, ocorrenciaController.delete);
routes.get('/contar-ocorrencias', authMiddleware, ocorrenciaController.countOcorrencias);
routes.get('/contar-ocorrencias-resolvidas', authMiddleware, ocorrenciaController.countOcorrenciasResolvidas);
routes.get('/contar-tipo-ocorrencia', authMiddleware, ocorrenciaController.countOcorrenciasPorTipo);

routes.post('/cadastro', policialController.register);
routes.post('/login', policialController.login);
routes.get('/policiais', authMiddleware, policialController.getAll);
routes.get('/policial/:id', authMiddleware, policialController.getPolicialID);
routes.post('/policiais/filtro', authMiddleware, policialController.getFilter);
routes.put('/atualizar-policial/:id', authMiddleware, policialController.update);
routes.get('/contar-policiais', authMiddleware, policialController.countPoliciais);
routes.get('/contar-militar', authMiddleware, policialController.countMilitar);
routes.get('/contar-civil', authMiddleware, policialController.countCivil);

module.exports = { routes };
import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionController();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;

// Rotas               Recursos
//http://localhost:333/users
//http://localhost:333/contacts

/* (Parte do Insomnia)
// GET: Buscar ou listar uma info
// POST: Criar nova info
// PUT: Atualizar info
// DELETE: Deletar info

// Corpo (Request Body): Dados para criação ou atualização de um registro
// Route Params: Identificar qual recurso eu quero atualizar ou deletar
// Query Params: Paginação, filtros, ordenação
*/
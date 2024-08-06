import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

/**
 * appendroutes is function that takes app and generate roots
 * @param {express} app - an express app
 */
const appendroutes = (app) => {
  app.get('/status', AppController.getStatus);

  app.get('/stats', AppController.getStats);

  app.post('/users', UsersController.postNew);
};

export default appendroutes;

import AppController from '../controllers/AppController';

/**
 * appendroutes is function that takes app and generate roots
 * @param {express} app - an express app
 */
const appendroutes = (app) => {
  app.get('/status', AppController.getStatus);
  app.get('/stats', AppController.getStats);
};

export default appendroutes;

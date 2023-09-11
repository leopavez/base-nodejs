import {Router} from 'express';
import usersController from './controllers/user-controller.js';
import authController from './controllers/auth-controller.js';

export default () => {
  const router = new Router();

  router.use(usersController());
  router.use(authController());

  return router;
};

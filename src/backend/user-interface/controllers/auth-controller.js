import {Router} from 'express';
import AuthInteractor from '../../application-core/auth/uses-cases/auth.interactor.js';

const router = new Router();

export default () => {
  router.post('/v1/authenticate', async (req, res, next) => {
    try {
      if (!req.body|| (req.body && Object.keys(req.body).length === 0)) {
        return await res.status(400).send({
          code: 400,
          message: 'Bad Request',
          status: false,
        });
      }
      return await res.status(200).json({
        data: await AuthInteractor.execute(req.body),
      });
    } catch (e) {
      next(e);
    }
  });


  return router;
};

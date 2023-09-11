/* eslint-disable max-len */
import {Router} from 'express';
import verifyToken from '../../middleware/verifyToken.js';
import CreateUserInteractor from '../../application-core/users/uses-cases/create-user.interactor.js';
import UpdateUserInteractor from '../../application-core/users/uses-cases/update-user.interactor.js';
import ListUserInteractor from '../../application-core/users/uses-cases/list-user.interactor.js';

// eslint-disable-next-line new-cap
const router = Router();

export default () => {
  router.post('/v1/users/create', async (req, res, next) => {
    try {
      res.status(200).json({
        data: await CreateUserInteractor.execute(req.body),
      });
    } catch (e) {
      next(e);
    }
  });

  router.post('/v1/users/update', verifyToken, async (req, res, next) => {
    try {
      res.status(200).json({
        data: await UpdateUserInteractor.execute(req.body),
      });
    } catch (e) {
      next(e);
    }
  });

  router.post('/v1/users/list', verifyToken, async (req, res, next) => {
    try {
      res.status(200).json({
        data: await ListUserInteractor.execute(req.body),
      });
    } catch (e) {
      next(e);
    }
  });


  return router;
};

import AuthUsersController from '../controllers/authUsersController';
import MyDiaryController from '../controllers/myDiaryController';
import CoinController from '../controllers/coinController';
import UserMiddleware from '../middleware/user';
import userValidation from '../middleware/validate';

const userRoute = (app) => {
  app.post('/api/v1/entries', UserMiddleware.validToken, userValidation.validateEntry, MyDiaryController.createEntry);
  app.get('/api/v1/user', UserMiddleware.validToken, userValidation.getUserDetail);
  // app.get('/api/v1/entries/:offSet', UserMiddleware.validToken, MyDiaryController.getAllEntries);
  app.get('/api/v1/entries', UserMiddleware.validToken, MyDiaryController.getAllEntries);
  app.get('/api/v1/latest', UserMiddleware.validToken, CoinController.getLatestCurrency);
  app.get('/api/v1/entry/:entryId', UserMiddleware.validToken, userValidation.validateParam, MyDiaryController.getEntryById);
  app.put('/api/v1/entries/:entryId', UserMiddleware.validToken, userValidation.validateParam, userValidation.validateEntry, MyDiaryController.editEntry);
  app.delete('/api/v1/entries/:entryId', UserMiddleware.validToken, userValidation.validateParam, MyDiaryController.deleteEntry);
  app.post('/api/v1/auth/signup', userValidation.validateRegistrationEntry, userValidation.checkExistingUser, AuthUsersController.registerUser);
  app.post('/api/v1/auth/login', userValidation.validateLogin, AuthUsersController.userLogin);
};

export default userRoute;

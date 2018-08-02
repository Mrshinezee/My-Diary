import authUsersController from '../controllers/authUsersController';
import myDiaryController from '../controllers/myDiaryController';
import UserValidation from '../helpers/user';

const userRoute = (app) => {
  app.post('/api/v1/entries', authUsersController.validToken, UserValidation.validateEntry, myDiaryController.createEntry);
  app.get('/api/v1/entries', authUsersController.validToken, myDiaryController.getAllEntries);
  app.get('/api/v1/entries/:entryId', authUsersController.validToken, myDiaryController.getEntryById);
  app.put('/api/v1/entries/:entryId', authUsersController.validToken, myDiaryController.editEntry);
  app.delete('/api/v1/entries/:entryId', authUsersController.validToken, myDiaryController.deleteEntry);
  app.post('/api/v1/auth/signup', UserValidation.validateRegistrationEntry, authUsersController.registerUser);
  app.post('/api/v1/auth/login', UserValidation.validateLogin, authUsersController.userLogin);
};

export default userRoute;

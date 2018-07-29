import authUsersController from '../controllers/authUsersController';
import myDiaryController from '../controllers/myDiaryController';
import UserValidation from '../helpers/user';

const userRoute = (app) => {
  app.post('/api/v1/entries', UserValidation.validateEntry, myDiaryController.createEntry);
  app.get('/api/v1/entries', myDiaryController.getAllEntries);
  app.get('/api/v1/entries/:entryId', myDiaryController.getEntryById);
  app.put('/api/v1/entries/:entryId', myDiaryController.editEntry);
  app.delete('/api/v1/entries/:entryId', myDiaryController.deleteEntry);
  app.post('/api/v1/auth/signup', UserValidation.validateRegistrationEntry, authUsersController.registerUser);
  app.post('/api/v1/auth/login', UserValidation.validateLogin, authUsersController.userLogin);
};

export default userRoute;

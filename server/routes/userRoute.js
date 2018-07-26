// import authUsersController from '../controller/user/authUsersController';
import myDiaryController from '../controllers/user/myDiaryController';
import UserValidation from '../helpers/user';

const userRoute = (app) => {
  app.post('/api/v1/entries', UserValidation.validateEntry, myDiaryController.createEntry);
  app.get('/api/v1/entries', myDiaryController.getAllEntries);
  app.get('/api/v1/entries/:id', myDiaryController.getEntryById);
  app.put('/api/v1/entries/:id', myDiaryController.editEntry);
  app.delete('/api/v1/entries/:id', myDiaryController.deleteEntry);
};

export default userRoute;

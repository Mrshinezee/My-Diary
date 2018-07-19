// import authUsersController from '../controller/user/authUsersController';
import myDiaryController from '../controller/user/myDiaryController';
import UserValidation from '../validation/user';

const userRoute = (app) => {
  app.post('/api/v1/entries', UserValidation.validateEntry, myDiaryController.createEntry);
  app.get('/api/v1/entries', myDiaryController.getAllEntries);
};

export default userRoute;

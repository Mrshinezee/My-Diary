import userRoute from './userRoute';

const routes = (app) => {
  app.get('/', (req, res) => res.status(200).json({
    message: 'Hello and welcome to the My-Diary application',
  }));
  app.get('/api/v1', (request, response) => response.status(200).json({
    message: 'Welcome to My-Diary application API, Version 1',
  }));

  userRoute(app);
};

export default routes;

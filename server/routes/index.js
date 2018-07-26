import userRoutes from './userRoute';

const routes = (app) => {
  app.get('/', (request, response) => response.status(200).json({
    message: 'My-Diary Application',
  }));

  app.get('/api/v1', (request, response) => response.status(200).json({
    message: 'Welcome to My-Diary App API, Version 1',
  }));


  userRoutes(app);
};

export default routes;

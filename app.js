import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import routes from './server/router';


const app = express();
const port = process.env.PORT || 4500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('UI'));

routes(app);


app.listen(port);
winston.log('info', `My-Diary application is listening on port ${port}`);
export default app;

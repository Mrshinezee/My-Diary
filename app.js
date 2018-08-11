import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import cors from 'cors';

import router from './server/routes';

const app = express();
const port = process.env.PORT || 4500;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('UI'));

router(app);
app.listen(port);
winston.log('info', `App is listening on port ${port}`);

export default app;

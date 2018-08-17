import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';


import router from './server/routes';

const app = express();
const port = process.env.PORT || 4500;
const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('UI'));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router(app);
app.listen(port);
winston.log('info', `App is listening on port ${port}`);

export default app;

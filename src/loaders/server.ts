import bodyParser from 'body-parser';
import cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
import routes from '../routes/routes'
import {logRequst} from '../middleware';
import errorHandler from '../middleware/errorHandler';

export default (app: express.Application) => {
	app.enable('trust proxy');
	app.use(cors());
	app.use(helmet());
	app.use(bodyParser.json());
	app.use(logRequst)
	app.use('/api', routes);

	app.use(errorHandler)
};

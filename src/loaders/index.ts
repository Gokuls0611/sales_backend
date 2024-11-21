import * as express from 'express';
import server from './server';
import client from './psql';
export default async (app: express.Application) => {
	await client.connect()
	server(app);
};

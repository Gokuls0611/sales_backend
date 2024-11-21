import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
	throw new Error("Couldn't find .env file");
}

export default {
	port: parseInt(process.env.PORT as string) || 3000,
	jwtSecret: process.env.JWT_SECRET || "secret",
	service: "evt-mng",
	debugLevel: process.env.DEBUG_LEVEL,
	nodeEnv: process.env.NODE_ENV || "development",
	database: {
		host: process.env.POSTGRES_HOST,
		password: process.env.POSTGRES_PASSWORD,
		db: process.env.POSTGRES_DB,
		port: parseInt(process.env.POSTGRES_PORT as string),
		user: process.env.POSTGRES_USER
	}
};

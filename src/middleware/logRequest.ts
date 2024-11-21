import {Request, Response, NextFunction} from "express";

const logRequest = (req: Request, _res: Response, next: NextFunction) => {
	next();
}

export default logRequest


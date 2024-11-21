import {NextFunction, Request, Response} from "express";

const asyncHandler =
	(fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (err: any) {
			next(err)
		}
	};

export default asyncHandler;

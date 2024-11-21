import * as jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import config from "../config";
import ApiError from "../lib/ApiError";

const authenticate = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	const token =
		req.headers &&
		req.headers.authorization &&
		req.headers.authorization.split(" ")[1];
	if (!token) throw new ApiError(401, "Jwt token not found")
	try {
		const decoded = jwt.verify(token, config.jwtSecret) as jwt.JwtPayload;
		req.query.loggedUserId = decoded.id;
		req.query.loggedUserEmail = decoded.email;
		req.query.loggedUserRole = decoded.role;
		next();
	} catch (err) {
		throw new ApiError(401, "Unauthorized")
	}
};

export default authenticate

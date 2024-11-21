import asyncHandler from "../../lib/asyncHandler";
import {Request, Response} from "express";
import * as s from "./service"
import ApiError from "../../lib/ApiError";
import ApiResponse from "../../lib/ApiResponse";
import {z} from "zod";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
	const {email, password, phone, name, role } = req.body;
	const { loggedUserRole } = req.query
	if(loggedUserRole === undefined || loggedUserRole !== 'master' ){
		throw new ApiError(401, "Master only create User")
	}
	if (!email || !phone || !name) {
		throw new ApiError(400, "Required fields are missing")
	}
	const user = await s.checkUserExists(email)
	if (user) {
		throw new ApiError(400, "User already exists")
	}
	const id = await s.createUser(name, password, email, phone , role)
	const token = await s.getJWT(email, id[0].userId ,id[0].role)
	if (!id || !token) {
		throw new ApiError(500, "Something went wrong")
	}
	res.status(201).json(
		new ApiResponse(201, "User created", {
			user: {
				email, name
			},
			token
		})
	)
})



export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
	const {id} = req.params;

	if (!z.number().safeParse(parseInt(id)).success) {
		throw new ApiError(400, "User id must be a number")
	}
	try{
		await s.deleteUser(parseInt(id))
		res.status(200).json(
			new ApiResponse(200, "User deleted", null)
		)
	}catch(error: any){
		throw new ApiError(403,error)
	}
})







export const login = asyncHandler(async (req: Request, res: Response) => {
	const {email, password} = req.body;
	const user = await s.checkUserExists(email)
	if (!user) {
		throw new ApiError(400, "User does not exist")
	}
	const verified = await s.verifyPassword(password, user.hash as string)
	if (!verified) {
		throw new ApiError(401, "Invalid Details")
	}
	const token = await s.getJWT(email, user.id, user.role)
	res.status(200).json(
		new ApiResponse(200, "Login", {
			user: {
				email,
				name: user.username,
				role: user.role
			},
			token
		})
	)
})

export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
	const users = await s.getAllUsers()
	res.status(200).json(new ApiResponse(200, "Users fetched", users))
})


export const updateUser = asyncHandler(async (req: Request, res: Response) => {
	
	const { name, email, phone, role } = req.body;
	const  { loggedUserRole } = req.query
	const { id } = req.params
	if(loggedUserRole!=='master'){
		throw new ApiError(401,'Master Only have access to Edit')
	}
	const response = await s.updateUser(parseInt(id), name, email, phone, role);
	res.status(201).json(
		new ApiResponse(201, "User Updated",response)
	)
	
})


export const createMaster = asyncHandler(async (_req: Request, res: Response) => {
	try{
		const id = await s.createUser("MASTER", "master", "master@gmail.com","1234567890", "master")
		res.status(201).json(new ApiResponse(200,"Master Created",id))
	}catch(error: any){
		throw new ApiError(400,error)
	}
})
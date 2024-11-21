import asyncHandler from "../../lib/asyncHandler";
import {Request, Response} from "express";
import * as s from "./service"
import ApiError from "../../lib/ApiError";
import ApiResponse from "../../lib/ApiResponse";
import {any, z} from "zod";
import { sales } from "./product_sales";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {

	const { name, description, price, quantity, email } = req.body;
	const { loggedUserEmail, loggedUserRole } = req.query
	if (loggedUserRole !== 'master' && loggedUserRole !== 'admin') {
		throw new ApiError(401, "Master or Admin can add Product")
	}
	if ( !name || !price ) {
		throw new ApiError(400, "Required fields are missing")
	}
	
	const id = await s.createProduct(name, description, price, quantity , loggedUserEmail as string )

	res.status(201).json(
		new ApiResponse(201, "Product created",id)
	)
})

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
	
	const { name, price, quantity } = req.body;
	const  { loggedUserRole, loggedUserEmail } = req.query
	const { id } = req.params
	if(loggedUserRole!=='master' && loggedUserRole!=='admin'){
		throw new ApiError(401,'Master or Admin can Edit Product')
	}
	const response = await s.updateProduct(parseInt(id), name, price, quantity, loggedUserEmail as string);
	res.status(201).json(
		new ApiResponse(201, "Product Updated",response)
	)
	
})


export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
	const {id} = req.params;
	const {loggedUserRole }  = req.query;
	console.log(id,loggedUserRole)
	if (loggedUserRole !== 'master' && loggedUserRole !== 'admin') {
		throw new ApiError(401, "Master or Admin can delete Product")
	}
	if (!z.number().safeParse(parseInt(id)).success) {
		throw new ApiError(400, "Product id must be a number")
	}
	try{
		await s.deleteProduct(parseInt(id))
		res.status(200).json(
			new ApiResponse(200, "Product deleted", null)
		)
	}catch(error){
		console.log(error)
		throw new ApiError(500, "Something went Wrong")
	}
})




export const getAllProducts = asyncHandler(async (_req: Request, res: Response) => {
	const users = await s.getAllProducts()
	res.status(200).json(new ApiResponse(200, "Users fetched", users))
})


//   export const BulkProduct = asyncHandler(async (_req: Request, res: Response) => {  INSERTING PRODUCTS INTO TABLE INITALLY
// 	const response = await s.BulkProduct(sales,"master@gmail.com")
// 	res.status(200).json(new ApiResponse(200, "Users fetched",response))
// })


export const getAllProductsData = asyncHandler(async (_req: Request, res: Response) => {
		try{
			const response = await s.getAllProductsData();
			res.status(200).json(new ApiResponse(200,"Datas fetched",response))
		}catch(error: any){
			console.log(error)
			throw new ApiError(500,error || "Something went wrong")
		}
})
export const getProductsSalesInDate = asyncHandler(async (req: Request, res: Response) => {
		const { date } = req.params
		try{
			const response = await s.getProductsSales(date);
			res.status(200).json(new ApiResponse(200,"Datas fetched",response))
		}catch(error: any){
			console.log(error)
			throw new ApiError(500,error || "Something went wrong")
		}
})
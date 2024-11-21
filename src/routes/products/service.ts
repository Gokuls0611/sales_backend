import {db} from "../../loaders/psql";
import {products, user, product_sales} from "../../config/schema";
import {eq} from "drizzle-orm";
import { sql } from "drizzle-orm";
import ApiError from "../../lib/ApiError";



export const createProduct = async (
	name: string, description: string , price: string, quantity: string, loggedUserEmail: string) => {
	try{
		const quantityValue = quantity ? parseInt(quantity): 0;
		return await db.insert(products).values({
			name:name,
			description:description?description:name,
			price:sql`${price}::decimal`,
			quantity:quantityValue,
			created_by:loggedUserEmail,
			updated_by:loggedUserEmail
		}).returning({
			name:products.name,
			email:products.updated_by
		})

	}catch(error){
		console.log(parseFloat(price));
		console.log(error)
		throw error;
	}
	
}

export const getAllProducts = async () => {
	return await db.select({
					id: products.id,
					name: products.name,
					description: products.description,
					price: products.price,
					initial_quantity: products.quantity,
					total_sales_quantity: sql`COALESCE(SUM(product_sales.quantity), 0)`.as("total_sales_quantity"),
					total_revenue: sql`COALESCE(ROUND(SUM(product_sales.total_sale),2), 0)`.as("total_revenue"),
					remaining_stock: sql`products.quantity - COALESCE(SUM(product_sales.quantity), 0)`.as("remaining_stock"),
					average_sale_price: sql`COALESCE(ROUND(AVG(product_sales.sale_price), 2), 0)`.as("average_sale_price")
				})
				.from(products)
				.leftJoin(product_sales, eq(products.id, product_sales.product_id))
				.groupBy(
					products.id,
					products.name,
					products.description,
					products.price,
					products.quantity
				)
				.orderBy(products.id);

}


export const deleteProduct = async (id: number) => {
	try{
		await db.delete(product_sales).where(eq(product_sales.product_id,id));
		await db.delete(products).where(eq(products.id, id));
	}catch(error){
		throw error
	}
}


export const updateProduct = async (id: number,name: string, price: string , quantity: string, email: string) => {
	try{
		const quantityValue = quantity ? parseInt(quantity): 0;
		await db.update(products)
			.set({
				name:name,
				price:sql`${price}::decimal`,
				quantity:quantityValue,
				updated_by:email
			})
			.where(eq(products.id, id))
			.returning({
				name:products.name,
				email:products.updated_by
			});
	}catch(error){
		console.log("FROM update",error)
		throw new ApiError(500,"Something went wrong")
	}
	
}


export const CheckUser = async (email: string):Promise<boolean> => {
		try{
			const role = await db.select({role:user.role}).from(user).where(eq(user.email,email));
			return role[0].role === 'master' ? true : false;
		}catch(error){
			console.log(error)
		}
		return false;
}


// export const BulkProduct = async (a: any = [],loggedUserEmail: string) => {     INSERTING PRODUCTS INTO TABLE INITALLY
// 	try{
// 		a.forEach(async (element: any = {}) => {
// 			const quantityValue = parseInt(element.quantity)
// 			const repsonse = await db.insert(product_sales).values({
// 				product_id:element.product_id,
// 				quantity:quantityValue,
// 				sale_price:element.sale_price,
// 				total_sale:element.total_sale,
// 				sale_date:element.date
// 			})
// 		});
		
// 	}
// 	catch(error){
// 		console.log(error)
// 	}
// }




export const getAllProductsData = async () => {

	try{
		return await db.select({
			sale_date: sql`DATE(${product_sales.sale_date})`.as("sale_date"),
			total_sales_quantity: sql`COALESCE(SUM(product_sales.quantity), 0)`.as("total_sales_quantity"),
			total_sale_price: sql`COALESCE(ROUND(SUM(product_sales.quantity * product_sales.sale_price), 2), 0)`.as("total_sale_price"),
			average_sale_price: sql`COALESCE(ROUND(AVG(product_sales.sale_price), 2), 0)`.as("average_sale_price"),
			average_product_price: sql`COALESCE(ROUND(AVG(products.price), 2), 0)`.as("average_product_price")
		})
		.from(product_sales)
		.leftJoin(products, eq(product_sales.product_id, products.id))
		.where(sql`DATE(${product_sales.sale_date}) >= CURRENT_DATE - INTERVAL '20 days'`) 
		.groupBy(sql`DATE(${product_sales.sale_date})`)
		.orderBy(sql`DATE(${product_sales.sale_date})`);
		
	}
	catch(error){
		throw error
	}
}


export const getProductsSales = async (date: string) => {
	try {
		const salesData = await db
		.select({
		  product_id: product_sales.product_id,
		  product_name: products.name,
		  sale_price: product_sales.sale_price,
		  quantity: product_sales.quantity,
		  total_sale_price: sql`product_sales.quantity * product_sales.sale_price`.as("total_sale_price"),
		  product_price: products.price,
		})
		.from(product_sales)
		.leftJoin(products, eq(product_sales.product_id, products.id))
		.where(sql`DATE(${product_sales.sale_date}) = ${date}`)
		.groupBy(
			product_sales.product_id, 
			products.name,
			products.price, 
			product_sales.sale_price, 
			product_sales.quantity
		  )
		.orderBy(product_sales.product_id)
	  
	
		const result = salesData.map((data: any) => {
		  const profitOrLossPercentage = ((data.sale_price - data.product_price) / data.product_price) * 100;
		  const isProfit = profitOrLossPercentage > 0;
	
		  return {
			product_id: data.product_id,
			quantity: data.quantity,
			product_name:data.product_name,
			total_sale_price: data.total_sale_price,
			profit_amount:(data.sale_price-data.product_price) * data.quantity,
			profit_or_loss_percentage: profitOrLossPercentage.toFixed(2),
			profit: isProfit,
		  };
		});
		return result;
	  } catch (error) {
		throw error;
	  }
}
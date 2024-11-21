import {db} from "../../loaders/psql";
import {user} from "../../config/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {eq} from "drizzle-orm";
import {TUserRole} from "../types/auth";
import { sql } from "drizzle-orm";


const JWT_SECRET = process.env.JWT_SECRET as string;
const saltRounds = 10;

export const getJWT = async (email: string, id: number,role :string) => {
	const objToSign = {
		email,
		id,
		role
	};

	return jwt.sign(objToSign, JWT_SECRET, {expiresIn: "1d"});
};


export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(saltRounds);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};


export const verifyPassword = async (password: string, hash: string) => {
	const match = await bcrypt.compare(password, hash);
	return match;
};

export const checkUserExists = async (email: string) => {
	const result = await db
		.select({
			id: user.id,
			email: user.email,
			username: user.username,
			hash: user.password,
			role:user.role,
		})
		.from(user)
		.where(eq(user.email, email))

	if (result.length === 0) {
		return null;
	}
	return result[0];
};
export const createUser = async (
	username: string, password: string, email: string, phone: string , userrole : TUserRole) => {
	const pass = password ? password : username; 
	const hashedPassword = await hashPassword(pass)
	return await db.insert(user).values({
		username, password: hashedPassword, email, phone, role: userrole? userrole :"user"
	}).returning({
		userId: user.id,
		email: user.email,
		role:user.role
	})
}

export const getAllUsers = async () => {
	return await db.select({
		id:user.id,
		phone: user.phone,
		name: user.username,
		email:user.email,
		role: user.role,
		created:sql`to_char(created_at,'dd-mm-yyyy') `
	}).from(user).orderBy(user.id)
}


export const deleteUser = async (id: number) => {
	try{
		const getuserrole = await db.select({role:user.role}).from(user).where(eq(user.id,id));

		if (getuserrole[0] && (getuserrole[0].role === 'admin' || getuserrole[0].role === 'master')) {
			throw ("Admin or Master can't be deleted");
		}
		await db.delete(user).where(eq(user.id, id));
	}
	catch(error){
		throw error
	}
}



export const updateUser = async ( id: number,username: string, email: string, phone: string, role: TUserRole,) => {
	await db.update(user).set({
		username:username,
		phone:phone,
		email:email,
		role:role
	}).where(eq(user.id, id));
}

import { pgTable, serial, timestamp, varchar, decimal, integer, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";


export const roleEnum = pgEnum('role', ['admin', 'master', 'user']);

export const user = pgTable("user", {
	id: serial("id").primaryKey(),
	email: varchar('email').notNull().unique(),
	phone: varchar('phone').notNull(),
	username: varchar("username").notNull(),
	password: varchar("password").notNull(),
	role: roleEnum('role').notNull().default('user'),
	created_at: timestamp("created_at").default(sql`now()`),
});

export const products = pgTable("products", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	description: varchar("description").notNull(),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	quantity: integer("quantity").default(sql`0`),
	created_at: timestamp("created_at").default(sql`now()`),
	created_by: varchar('created_by').references(() => user.email),
	updated_by: varchar('updated_by').references(() => user.email),
});



export const product_sales = pgTable("product_sales", {
	id: serial("id").primaryKey(),
	product_id: integer("product_id").notNull().references(() => products.id),
	quantity: integer("quantity").default(sql`0`),
	sale_price: decimal("sale_price", { precision: 10, scale: 2 }).notNull(),
	total_sale: decimal("total_sale", { precision: 10, scale: 2 }).notNull(),
	sale_date: timestamp("sale_date").default(sql`now()`),
  });


  
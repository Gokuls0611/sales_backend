import {eq} from "drizzle-orm";
import {db} from "../loaders/psql";

export function isValidISO8601(dateString: string) {
	const date = new Date(dateString);
	return !isNaN(date.getTime()) && date.toISOString() === dateString;
}
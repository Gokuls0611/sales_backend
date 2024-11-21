import z from "zod";
import {roleEnum, user} from "../../config/schema";

const roleEnumSchema = z.enum(roleEnum.enumValues);
export type TUserRole = z.infer<typeof roleEnumSchema>
export type TUser = typeof user.$inferSelect

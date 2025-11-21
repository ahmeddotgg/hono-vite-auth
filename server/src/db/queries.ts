import { eq } from "drizzle-orm";
import { db } from "./index";
import { users } from "./schema";

export const findUserByEmail = async (email: string) => {
	const user = await db.query.users.findFirst({ where: eq(users.email, email) });
	return user;
};

export const insertUser = async (data: { name: string; age: number; email: string; password: string }) => {
	const result = await db
		.insert(users)
		.values(data)
		.returning({ id: users.id, name: users.name, age: users.age, email: users.email });

	return result[0];
};

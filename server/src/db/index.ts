import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const db: LibSQLDatabase<typeof schema> = drizzle({
	connection: {
		url: process.env.TURSO_DATABASE_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
	schema,
});

import { Hono } from "hono";
import { findUserByEmail, insertUser } from "../db/queries";
import { generateAuthToken } from "../lib/utils";

export const AuthRoutes = new Hono();

AuthRoutes.post("/register", async (c) => {
	const { name, age, email, password } = await c.req.json();

	if (!name || !age || !email || !password) {
		return c.json({ message: "please provide all required data" }, 400);
	}

	const user = await findUserByEmail(email);
	if (user) {
		return c.json({ message: "user already exsits" }, 400);
	}

	try {
		const hash = await Bun.password.hash(password);
		const newUser = await insertUser({ name, age, email, password: hash });

		await generateAuthToken(c, newUser.id);

		return c.json({ message: "sucsess", user: newUser });
	} catch (error) {
		console.log(error);
		return c.json({ message: "error" }, 400);
	}
});

AuthRoutes.post("/login", async (c) => {
	const { email, password } = await c.req.json();

	if (!email || !password) {
		return c.json({ message: "please provide email and password" }, 400);
	}

	const user = await findUserByEmail(email);
	if (!user) {
		return c.json({ message: "invalid credentials" }, 401);
	}

	try {
		const isPasswordValid = await Bun.password.verify(password, user.password);
		if (!isPasswordValid) {
			return c.json({ message: "invalid credentials" }, 401);
		}

		await generateAuthToken(c, user.id);

		return c.json({ message: "success", user: { id: user.id, name: user.name, email: user.email } });
	} catch (error) {
		console.log(error);
		return c.json({ message: "error" }, 500);
	}
});

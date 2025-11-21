import { sign, verify } from "hono/jwt";
import { setCookie } from "hono/cookie";

export const generateAuthToken = async (c: any, userId: string | number) => {
	const payload = {
		sub: userId.toString(),
		role: "user",
		exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
	};
	const token = await sign(payload, process.env.JWT_SECRET!);

	setCookie(c, "token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "Lax",
		maxAge: 7 * 24 * 60 * 60,
	});

	return token;
};

export const verifyToken = async (token: string) => {
	try {
		const decoded = await verify(token, process.env.JWT_SECRET!);
		return decoded;
	} catch (error) {
		return null;
	}
};

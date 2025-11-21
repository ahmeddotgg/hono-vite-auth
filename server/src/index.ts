import { Hono } from "hono";
import { logger } from "hono/logger";
import { AuthRoutes } from "./routes/auth";

const app = new Hono({ strict: false }).basePath("/api");

app.use(logger());

app.get("/", (c) => c.json("Hello Bun"));

app.route("/auth", AuthRoutes);

export default app;

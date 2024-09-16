import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authenticationRoutes.js";
import morgan from "morgan";
import accessControlRoutes from "./routes/authorisationRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const config = process.env;

import cors from "cors";

const PORT = 4040;
const app = express();

app.use(morgan("dev"));
app.use(cookieParser(config.TOKEN));
const corsOptions = {
	origin: true,
	credentials: true, //included credentials as true
	preflightContinue: true,
};
app.use(cors(corsOptions));

app.use((_req, res, next) => {
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE",
	);
	res.header(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type,Content-Type, Authorization,Authentication,withCredentials, Content-Length, X-Requested-With, Accept, x-access-token,credentials, Origin, X-Content-Type-Options",
	);
	res.header(
		"Access-Control-Expose-Headers",
		"x-access-token, Authorization, Authentication, withCredentials, credentials, Set-Cookie",
	);
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

app.use(express.json());

// Set Cors Options before other routes for all possible routes, enabling preflight across the board
app.options("*", cors(corsOptions));

app.use("/api/auth/", authRoute);
app.use("/api/posts/", accessControlRoutes);

try {
	app.listen(PORT, () =>
		console.log(`Connected and listening on port ${PORT}.`),
	);
} catch (err) {
	console.log(`Failed to start the server with error: ${err}`);
}

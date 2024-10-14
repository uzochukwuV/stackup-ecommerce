
import dotenv from "dotenv";
import register from "../../authentication/register.js";

dotenv.config();
const config = process.env;

import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

const addUser = async (req, res) => {
	try {
		const token = req.signedCookies["advanced-state-management-user"];
        
		const user = jwt.verify(token, config.TOKEN);
		const sellerUserName = user.username ?? null;
		const sellerId = user.userId ?? null;
		const sellerRole = user.role ?? null;

        console.log(user);
        

		if (!sellerUserName || !sellerId) {
			return res.status(401).json({
				error: "Unauthorized or cookie has expired",
				message: "Cookie is invalid",
				status: 401,
				ok: false,
			});
		}

		if (sellerRole !== "admin") {
			return res.status(401).json({
				error: "Unauthorized ",
				message: "does not have permission to add User",
				status: 401,
				ok: false,
			});
		}

		register(req, res);

		
	} catch (err) {
		return res.status(503).json({
			error: "Internal server error",
			message: err,
			status: 503,
			ok: false,
		});
	}
};

export default addUser;

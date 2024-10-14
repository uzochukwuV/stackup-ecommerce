import ProductModel from "../../../models/ProductModel.js";
import dotenv from "dotenv";

dotenv.config();
const config = process.env;

import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

const createProduct = async (req, res) => {
	try {
		const token = req.signedCookies["advanced-state-management-user"];
        
		const user = jwt.verify(token, config.TOKEN);
		const sellerUserName = user.username ?? null;
		const sellerId = user.userId ?? null;
		const sellerRole = user.role ?? null;

   
        

		if (!sellerUserName || !sellerId) {
			return res.status(401).json({
				error: "Unauthorized or cookie has expired",
				message: "Cookie is invalid",
				status: 401,
				ok: false,
			});
		}

		if (sellerRole !== "admin" && sellerRole !== "seller") {
			return res.status(401).json({
				error: "Unauthorized ",
				message: "does not have permission to post products",
				status: 401,
				ok: false,
			});
		}

		const { name, price, quantity, img } = req.body;
		if (!name || !price) {
			return res.status(400).json({
				error: "Malformed Input",
				message: "Title or description cannot be empty",
				status: 400,
				ok: false,
			});
		}
		await ProductModel.create({
			sellerId: sellerId,
			name: name,
			price: price,
			quantity: quantity,
			img: img,
		});

		return res.status(200).json({
			message: "Successfully created new Product",
			status: 200,
			ok: true,
		});
	} catch (err) {
		return res.status(503).json({
			error: "Internal server error",
			message: err,
			status: 503,
			ok: false,
		});
	}
};

export default createProduct;

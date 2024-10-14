
import bcrypt from "bcryptjs";
import UserModel from "../../../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();
const config = process.env;

import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;


const delUser = async (req, res) => {
	try {
        const token = req.signedCookies["advanced-state-management-user"];
        
		const user = jwt.verify(token, config.TOKEN);
		const userUserName = user.username ?? null;
		const userId = user.userId ?? null;
		const userRole = user.role ?? null;

        console.log(user);
        

		if (!userUserName || !userId) {
			return res.status(401).json({
				error: "Unauthorized or cookie has expired",
				message: "Cookie is invalid",
				status: 401,
				ok: false,
			});
		}

		if (userRole !== "admin") {
			return res.status(401).json({
				error: "Unauthorized ",
				message: "does not have permission to add User",
				status: 401,
				ok: false,
			});
		}
		
		let {id,  email } = req.body;
		if (!id || !email) {
			return res.status(400).json({ message: "Invalid Request" });
		}
		// Check if user already exists
		
		const emailExists = await UserModel.findOne({ where: { email: email } });
		if (!emailExists) {
			return res
				.status(400)
				.json({ message: "Email does not exists", ok: false });
		}
		

		// del  user
		const isDeleted = await UserModel.destroy({
			where: { id: id, email:email },
		});

		if (!isDeleted) {
			return res.status(404).json({
				error: "Not Found",
				message: "Not able to delete specified resource.",
				status: 404,
				ok: false,
			});
		}

		return res.status(200).json({
			message: "Successfully deleted a User!",
			status: 200,
			ok: true,
		});

	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

export default delUser;

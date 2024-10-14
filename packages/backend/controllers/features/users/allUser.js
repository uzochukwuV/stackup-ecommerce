import UserModel from "../../../models/UserModel.js";

const allUser = async (req, res) => {
	try {
		const users = await UserModel.findAll({
			attributes: {
				exclude: ["salt", "password"],
			},
		}).catch((err) => {
			return res.status(404).json({
				error: err,
				message: "No product found",
				status: 404,
				ok: false,
			});
		});

		return res.status(200).json({
			users: users,
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

export default allUser;

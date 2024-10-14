import ProductModel from "../../../models/ProductModel.js";

const allProducts = async (_req, res) => {
	try {
		const all = await ProductModel.findAll().catch((err) => {
			return res.status(404).json({
				error: err,
				message: "No product found",
				status: 404,
				ok: false,
			});
		});

		return res.status(200).json({
			message: "Successfully updated Products!",
			status: 200,
			ok: true,
			products: all,
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

export default allProducts;

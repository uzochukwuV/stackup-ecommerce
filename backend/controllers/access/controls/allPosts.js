import BlogModel from "../../../models/BlogModel.js";

const allPosts = async (_req, res) => {
	try {
		const all = await BlogModel.findAll().catch((err) =>
			console.error(`Failed to find all with ${err}`),
		);

		return res.status(200).json({
			message: "Successfully updated blog post!",
			status: 200,
			ok: true,
			posts: all,
		});
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			reason: err,
		});
	}
};

export default allPosts;

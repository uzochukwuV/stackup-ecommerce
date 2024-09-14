import BlogModel from "../../../models/BlogModel.js";

const createPost = async (req, res) => {
	try {
		const authorUserName =
			req.signedCookies["advanced-state-management-user"].username;
		const authorId = req.signedCookies["advanced-state-management-user"].id;

		if (!authorUserName || !authorId) {
			return res.status(401).json({
				error: "Unauthorized or cookie has expired",
				status: 401,
				ok: false,
			});
		}
		const { title, content } = req.body;
		if (!title || !content) {
			return res.status(400).json({
				error: "Malformed Input. Title or description cannot be empty",
				status: 400,
				ok: false,
			});
		}
		await BlogModel.create({
			authorId: authorId,
			authorUserName: authorUserName,
			title: title,
			content: content,
		});

		return res.status(200).json({
			message: "Successfully created new blog post!",
			status: 200,
			ok: true,
		});
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			reason: err,
		});
	}
};

export default createPost;

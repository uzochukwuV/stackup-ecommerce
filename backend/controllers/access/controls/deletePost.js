import BlogModel from "../../../models/BlogModel.js";

const deletePost = async (req, res) => {
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

		const { id: blogPostId, title } = req.body;
		if (!title) {
			return res.status(400).json({
				error: "Malformed Input. Title or description cannot be empty",
				status: 400,
				ok: false,
			});
		}

		const isDeleted = await BlogModel.destroy({
			where: { id: blogPostId, authorId: authorId, title: title },
		});

		if (!isDeleted) {
			return res.status(404).json({
				error: "Blog post does not exist.",
				status: 404,
				ok: false,
			});
		}

		return res.status(200).json({
			message: "Successfully deleted a blog post!",
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

export default deletePost;

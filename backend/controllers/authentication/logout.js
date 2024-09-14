const logout = async (_req, res) => {
	try {
		res.clearCookie("advanced-state-management-user");
		return res.status(200).json({
			ok: true,
			message: "Logout Successful",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

export default logout;

const getUserId = async (req) => {
	return req?.signedCookies?.user?.id || 0;
};

export default getUserId;

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = (req, res) => {
	const { username, email, password } = req.body;

	//validation
	if (!username || !email || !password) {
		return res.status(400).json({ message: 'please include all fields' });
	}
};

// @desc    Login a user
// @route   /api/users
// @access  Public
const loginUser = (req, res) => {
	res.send('Login route');
};

// exported for userRoutes.js
module.exports = {
	registerUser,
	loginUser,
};

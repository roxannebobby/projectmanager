const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// brings in the model
const User = require('../models/userModel');

// start--register user
// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	//validation
	if (!username || !email || !password) {
		res.status(400);
		throw new Error('Please complete all fields.');
	}

	// if all fields are there, find if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists.');
	}

	// hashing password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// create user
	const user = await User.create({
		username,
		email,
		password: hashedPassword,
	});
	console.log(user);

	if (user) {
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			token: generateToken(User._id),
		});
	} else {
		res.status(400);
		throw new Error('invalid user data');
	}
});
// end of register user above

// start--login user
// @desc    Login a user
// @route   /api/users
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	//check user and passwords match
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			username: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid username or password');
	}
});
// end login user above

// @desc    START--Get current user /me
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
	const user = {
		id: user._id,
		email: user.email,
		name: user.username,
	};
	res.status(200).json(user);
});

// END Get current user /me

// generate token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

// exported for userRoutes.js
module.exports = {
	registerUser,
	loginUser,
	getMe,
};

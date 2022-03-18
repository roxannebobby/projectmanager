const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const app = express();
const colors = require('colors');

//connect to DB
connectDB();

// allow raw json
app.use(express.json());
// allow urlencoded messages
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Welcome to the Project Manager Dashboard API',
	});
});

// Routes
app.use('/api/users', require('./routes/userRoutes.js'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const { join } = require('node:path');
const express = require('express');
const app = express();
const apiRoute = require('./routes/api-route');
const viewRoute = require('./routes/view-route');

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server static
app.use(express.static(join(__dirname, './public')));

app.use('/api', apiRoute);
app.use('/', viewRoute);

// not found
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'fail',
		message: `can't find ${req.originalUrl}`
	});
});

app.listen(8000, () => console.log('Listening on :8000 ...'));

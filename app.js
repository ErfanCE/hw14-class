const { join } = require('node:path');
const express = require('express');
const app = express();
const apiRoute = require('./routes/api-route');
const viewRoute = require('./routes/view-route');
const { AppError } = require('./utils/app-error');
const products = require('./dbs/products-data.json');

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server static
app.use(express.static(join(__dirname, './public')));

app.get('/product/:productId', (req, res, next) => {
	const { productId } = req.params;

	if (!!isNaN(Number(productId))) {
		return next(new AppError(400, 'use valid id: (id must be integer)'));
		// * 3
		// return next(
		// 	new Error('use valid id: (id must be integer)', {
		// 		cause: {
		// 			statusCode: 500,
		// 			status: 'error'
		// 		}
		// 	})
		// );
		// * 2
		// throw new Error('use valid id: (id must be integer)');
		// * 1
		// return res.status(400).json({
		// 	status: 'fail',
		// 	message: `use valid id: (id must be integer)`
		// });
	}

	const product = products.find(product => product.id === Number(productId));

	if (!product) {
		return next(new AppError(500, `productId: ${productId} not found.`));
		// return next(
		// 	new Error(`productId: ${productId} not found.`, {
		// 		cause: {
		// 			statusCode: 400,
		// 			status: 'fail'
		// 		}
		// 	})
		// );
		// throw new Error(`productId: ${productId} not found.`);

		// return res.status(404).json({
		// 	status: 'fail',
		// 	message: `productId: ${productId} not found.`
		// });
	}

	res.status(200).json({
		status: 'success',
		data: { product }
	});
});

app.use('/api', apiRoute);
app.use('/', viewRoute);

// not found
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'fail',
		message: `can't find ${req.originalUrl}`
	});
});

// global error handler
app.use((err, req, res, next) => {
	const { statusCode, status, message } = err;

	res.status(statusCode).json({ status, message });
});

app.listen(8000, () => console.log('Listening on :8000 ...'));

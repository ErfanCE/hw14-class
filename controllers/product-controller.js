const products = require('../dbs/products-data.json');

// CRUD Operation
const getProductById = (req, res) => {};
const createProductById = (req, res) => {};
const updateProductById = (req, res) => {};
const deleteProductById = (req, res) => {};

const getAllProducts = (req, res) => {
	const { page = 1, limit = 10 } = req.query;

	const skip = (Number(page) - 1) * Number(limit);
	const productsData = [...products].slice(skip, skip + Number(limit));

	// stateless pagination
	res.status(200).json({
		status: 'success',
		per_page: Number(limit),
		total: products.length,
		total_pages: Math.ceil(products.length / Number(limit)),
		data: { productsData }
	});
};

module.exports = {
	getProductById,
	updateProductById,
	createProductById,
	deleteProductById,
	getAllProducts
};

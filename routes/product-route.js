const router = require('express').Router();
const {
	getProductById,
	deleteProductById,
	createProductById,
	updateProductById,
	getAllProducts
} = require('../controllers/product-controller');

router.get('/', getAllProducts);

// CRUD Product > /product/1
router
	.route('/:productId')
	.get(getProductById)
	.post(createProductById)
	.patch(updateProductById)
	.delete(deleteProductById);

// router.get('/:productId', getProductById);
// router.post('/:productId', createProductById);
// router.patch('/:productId', updateProductById);
// router.delete('/:productId', deleteProductById);

module.exports = router;

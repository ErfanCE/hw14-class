const router = require('express').Router();
const authRoute = require('./auth-route');
const adminRoute = require('./admin-route');
const productRoute = require('./product-route');

router.use('/auth', authRoute);

router.use('/admin', adminRoute);

// Rest API
// router.use('/products', productRoute);

module.exports = router;

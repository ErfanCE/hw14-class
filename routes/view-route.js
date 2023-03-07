const { join } = require('node:path');
const router = require('express').Router();

router.get('/login', (req, res) => {
	res.status(200).sendFile(join(__dirname, '../views/login-page.html'));
});

router.get('/signup', (req, res) => {
	res.status(200).sendFile(join(__dirname, '../views/signup-page.html'));
});

router.get('/admin-panel', (req, res) => {
	res.status(200).sendFile(join(__dirname, '../views/admin-panel-page.html'));
});

module.exports = router;

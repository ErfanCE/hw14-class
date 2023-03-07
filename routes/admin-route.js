const router = require('express').Router();
const {
	getAllUsers,
	getUserByUsername,
	removeUserByUsername
} = require('../controllers/admin-controller');

router.get('/get-all-users', getAllUsers);

router.get('/get-user/:username', getUserByUsername);

router.delete('/remove-user/:username', removeUserByUsername);

module.exports = router;

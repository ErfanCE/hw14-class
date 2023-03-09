const { writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const users = require('../dbs/users-data.json');
const { AppError } = require('../utils/app-error');

const getAllUsers = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: { users }
	});
};

const getUserByUsername = (req, res, next) => {
	const { username } = req.params;

	const user = users.find(user => user.username === username);

	if (!user) {
		return next(new AppError(404, `username: ${username} not found.`));
	}

	res.status(200).json({
		status: 'success',
		data: { user }
	});
};

const removeUserByUsername = async (req, res, next) => {
	try {
		const { username } = req.params;

		const user = users.find(user => user.username === username);

		if (!user) {
			return next(new AppError(404, `username: ${username} not found.`));
		}

		const usersData = users.filter(user => user.username !== username);

		await writeFile(
			join(__dirname, '../dbs/users-data.json'),
			JSON.stringify(usersData, null, 2)
		);

		res.status(204).json({
			status: 'success',
			data: { user }
		});
	} catch (error) {
		console.log(`[-] > removeUserByUsername > ${error?.message}`);

		next(new AppError(500, `internal server error, try again`));
	}
};

module.exports = { getAllUsers, getUserByUsername, removeUserByUsername };

const { writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const users = require('../dbs/users-data.json');

const getAllUsers = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: { users }
	});
};

const getUserByUsername = (req, res) => {
	const { username } = req.params;

	const user = users.find(user => user.username === username);

	if (!user) {
		return res.status(404).json({
			status: 'fail',
			message: `username: ${username} not found.`
		});
	}

	res.status(200).json({
		status: 'success',
		data: { user }
	});
};

const removeUserByUsername = async (req, res) => {
	try {
		const { username } = req.params;

		const user = users.find(user => user.username === username);

		if (!user) {
			return res.status(404).json({
				status: 'fail',
				message: `username: ${username} not found.`
			});
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

		res.status(500).json({
			status: 'error',
			message: `internal server error, try again`
		});
	}
};

module.exports = { getAllUsers, getUserByUsername, removeUserByUsername };

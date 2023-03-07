const { join } = require('node:path');
const { writeFile } = require('node:fs/promises');
const users = require('../dbs/users-data.json');

const signup = async (req, res) => {
	try {
		const {
			firstname = null,
			lastname = null,
			username = null,
			password = null,
			gender = null
		} = req.body;

		if (!username?.trim() || !password?.trim()) {
			return res.status(400).json({
				status: 'fail',
				message: 'username and password are required.'
			});
		}

		const user = users.find(user => user.username === username);

		// unique username
		if (!!user) {
			return res.status(400).json({
				status: 'fail',
				message: `username: ${username} already taken, try another.`
			});
		}

		users.push({
			firstname,
			lastname,
			username,
			password,
			gender
		});

		await writeFile(
			join(__dirname, '../dbs/users-data.json'),
			JSON.stringify(users, null, 2)
		);

		res.status(200).json({
			status: 'success',
			data: {
				firstname,
				lastname,
				username,
				password,
				gender
			}
		});
	} catch (error) {
		console.log(`[-] > signup > ${error?.message}`);

		res.status(500).json({
			status: 'error',
			message: `internal server error, try again`
		});
	}
};

const login = (req, res) => {
	const { username = null, password = null } = req.body;

	if (!username?.trim() || !password?.trim()) {
		return res.status(400).json({
			status: 'fail',
			message: 'username and password are required.'
		});
	}

	const user = users.find(user => user.username === username);

	if (!user) {
		return res.status(401).json({
			status: 'fail',
			message: `username or password are not match`
		});
	}

	if (user.password !== password) {
		return res.status(401).json({
			status: 'fail',
			message: `username or password are not match`
		});
	}

	res.status(200).json({
		status: 'success',
		data: { user }
	});
};

module.exports = { signup, login };

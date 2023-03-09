// Ajax,
const renderTable = async () => {
	try {
		// reset modal
		document.querySelector('.user-info').innerHTML = '';

		const response = await axios.get(
			'http://localhost:8000/api/admin/get-all-users'
		);

		// const response = await axios.post('/user', {
		// 	username: '',
		// 	password: ''
		// });

		const users = response.data.data.users;

		let tbody = '';
		for (const user of users) {
			tbody += `
      <tr onclick="readUserInfo('${user.username}')">
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.username}</td>
        <td>${user.gender}</td>
      </tr>`;
		}

		document.querySelector('tbody').innerHTML = tbody;
	} catch (error) {
		console.log(error);
	}
};

renderTable();

const readUserInfo = async username => {
	try {
		const response = await axios.get(
			`http://localhost:8000/api/admin/get-user/${username}`
		);

		const { firstname, lastname, gender } = response.data.data.user;

		document.querySelector('.user-info').innerHTML = `
      <p>firstname: ${firstname}</p>
      <p>lastname: ${lastname}</p>
      <p>username: ${username}</p>
      <p>gender: ${gender}</p>

      <button onclick="removeUser('${username}')">remove user</button>
    `;

		// open modal
		document.getElementById('modal').style.display = 'block';
	} catch (error) {
		console.log(error);
	}
};

const removeUser = async username => {
	try {
		const response = await axios.delete(
			`http://localhost:8000/api/admin/remove-user/${username}`
		);

		// console.log(response);
		// console.log(`user ${username} remove successfully`);

		// close modal
		document.getElementById('modal').style.display = 'none';

		// refresh page
		setTimeout(() => {
			location.reload();
		}, 1000);
	} catch (error) {
		console.log(error);
	}
};

const login = async () => {
	try {
		// reset error log
		document.querySelector('.error-log').innerHTML = '';

		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		const body = JSON.stringify({ username, password });

		const responseObject = await fetch('http://localhost:8000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});

		// throw fetch error
		if (!responseObject.ok) {
			throw new Error('fetch-error', {
				cause: await responseObject.json()
			});
		}

		// successful response
		const response = await responseObject.json();
		console.log(response.data);
	} catch (error) {
		// console.log(error);
		// console.log(error.cause);
		document.querySelector('.error-log').innerHTML = error.cause.message;
	}
};

// event handler
document.querySelector('#login-form > button').addEventListener('click', login);

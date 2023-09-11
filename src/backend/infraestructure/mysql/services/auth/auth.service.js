import conexion from '../../config-sql.js';

let authService = {};

authService.getUserByEmail = async email => {
	try {

		let query = `select u.id, u.password, u.name, u.last_name, u.role from users u where u.email = '${email}'`;

		return new Promise(function (resolve, reject) {
			conexion.query(query, function (err, result) {
				if (!err) {
					resolve(JSON.parse(JSON.stringify(result)));
					return true;
				} else {
					reject(err);
					throw err;
				}
			});
		});
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
};

export default authService;

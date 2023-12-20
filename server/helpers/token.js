const jwt = require('jsonwebtoken');

// секретная подпись, которая хранится в  поле environment (файл docker-compose)
const sign = process.env.JWT_SECRET;

module.exports = {
	//генерируем токен
	generate(data) {
		return jwt.sign(data, sign, { expiresIn: '1d' });
	},
	//проверяем токен
	verify(token) {
		return jwt.verify(token, sign);
	},
};

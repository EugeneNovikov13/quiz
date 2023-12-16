const jwt = require('jsonwebtoken');

// секретная подпись, которая хранится в файле .env (файл переменных окружения)
const sign = process.env.JWT_SECRET;

module.exports = {
	//генерируем токен
	generate(data) {
		return jwt.sign(data, sign, { expiresIn: '1d' });
	},
	//проверяем токен
	verify(token) {
		console.log('verify args: ',token, sign);
		return jwt.verify(token, sign);
	},
};

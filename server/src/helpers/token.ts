import jwt, { Secret } from 'jsonwebtoken';

// секретная подпись, которая хранится в  поле environment (файл docker-compose)
const sign: Secret = process.env.JWT_SECRET;

export default {
	//генерируем токен
	generate(data: { id: string }) {
		return jwt.sign(data, sign, { expiresIn: '1d' });
	},
	//проверяем токен
	verify(token: string) {
		return jwt.verify(token, sign);
	},
};

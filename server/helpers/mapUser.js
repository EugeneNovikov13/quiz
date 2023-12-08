module.exports = function (user) {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		surname: user.surname,
		image: user.image,
	}
}

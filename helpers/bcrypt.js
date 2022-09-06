const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}
const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = { hashPassword, comparePassword }
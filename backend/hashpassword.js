const bcrypt = require('bcryptjs');

const plainTextPassword = 'Jiangqian123';
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);

console.log(hashedPassword); // Output the hashed password

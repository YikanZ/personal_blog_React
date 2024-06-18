const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
  { username: 'yikan.zhang', password: '$2a$10$km6st2XYJmYNKtgBwUI9AOLR1N9ceXO.N4ufB9u45RP5lSM83ulQa' }
];

const secret = 'shanghai1988';

const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  
  if (!user) {
    console.log('User not found');
    return res.status(400).json({ message: 'PewPew, You are not Yikan' });
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    console.log('Invalid password');
    return res.status(400).json({ message: 'PewPew, You are not Yikan' });
  }

  const token = jwt.sign({ username: user.username }, secret, { expiresIn: '1h' });

  res.json({ token, message: 'Welcome back Yikan' });
};

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { login, authenticateJWT };

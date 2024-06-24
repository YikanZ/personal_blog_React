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

  const token = jwt.sign({ username: user.username }, secret, { expiresIn: '1000h' });

  res.json({ token, message: 'Welcome back Yikan' });
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    // Token verification using secret
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = { login, authenticateJWT };

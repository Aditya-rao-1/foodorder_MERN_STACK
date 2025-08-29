// middleware.js
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Token received:', token); // Debug log

  if (!token) return res.sendStatus(401); // No token found

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          console.log('Token verification failed:', err); // Debug log
          return res.sendStatus(403); // Invalid token
      }
      req.user = user;
      next();
  });
};


export default authenticateToken;

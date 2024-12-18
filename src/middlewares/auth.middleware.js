const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Middleware to authenticate user with JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Verify token with secret key
    req.user = decoded;  // Attach user info to the request object
    next();  // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

const isPlayer = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Get token from Authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const Role = decoded.role;
      req.playerId = decoded.userId;
      req.user = decoded
    if (Role !== 'PLAYER') {
      return res.status(403).json({
        success: false,
        message: 'Access restricted to players only',
      });
  }
  next();
} catch (error) {
  return res.status(400).json({ message: 'Invalid token.' });
}
};

const isAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Get token from Authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const Role = decoded.role;
      req.ownerId = decoded.userId;
      req.user = decoded
    if (Role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only' });
    }
  next();
} catch (error) {
  return res.status(400).json({ message: 'Invalid token.' });
}
};

module.exports = { authenticateToken, isPlayer, isAdmin };

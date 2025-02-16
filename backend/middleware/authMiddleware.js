import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get token from request headers
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Middleware to restrict access based on roles
const roleMiddleware = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ message: 'Unauthorized: No user data' });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: `Access denied. Only ${roles.join(', ')} can access this resource.` });
  }

  next();
};

export { authMiddleware, roleMiddleware };

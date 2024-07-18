const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split('Bearer ')[1];


  

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified; 
    next(); 
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};

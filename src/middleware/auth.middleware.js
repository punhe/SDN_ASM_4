const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing'
      });
    }

    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is invalid'
    });
  }
};

module.exports = auth;
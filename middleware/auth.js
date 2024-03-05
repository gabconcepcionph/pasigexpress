const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next)=> {
    try {
        const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded)
      req.user = decoded; 
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.', error: error.message});
    }
}
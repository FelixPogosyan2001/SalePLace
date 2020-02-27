const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  const authHeader = req.get('Authorization');
  let decoded;

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  
  const token = authHeader.split(' ')[1]; //Basic token;
  
  if (token === 'null' || !token.trim()) {
    req.isAuth = false;
    return next();
  }

  try {
    decoded = jwt.verify(token,'saleplace952324');
  } catch(e) {
      console.log(e);
      req.isAuth = false;
      return next()
  }

  if (!decoded) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decoded;
  next();
}
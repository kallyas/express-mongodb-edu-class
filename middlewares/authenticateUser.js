const { isValidToken } = require("./jwt");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).send("Access denied. No token provided.");

  try {
    const payload = isValidToken(token);
    req.user = payload.user;
    next();
  } catch (error) {
    res.status(401).send("Access denied. Invalid token.");
    next(error);
  }
};

const checkUser = (req, res, next) => {
  if (req.user.id == req.params.id) {
    next();
  } else {
    res
      .status(401)
      .send("Access denied. You are not authorized to view this resource.");
  }
};

const authorizeRoles = (...roles) => {
  return ( req, res, next) => {
    console.log(roles);
    if(roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send("Access denied. You are not authorized to view this resource.");
    }
  }
}

module.exports = {
  authenticateUser,
  checkUser,
  authorizeRoles
};

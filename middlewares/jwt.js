const jwt = require("jsonwebtoken");

const defaultOptions = {
  expiresIn: process.env.JWT_LIFETIME,
};

const createJWT = ({ payload, options }) => {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    ...defaultOptions,
    ...options,
  });

  return token;
};

const isValidToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

// cookie, token

const sendResponseWithCookie = ({ res, statusCode, user, options }) => {
  const token = createJWT({ payload: { user }, options });

  const oneDay = 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.COOKIE_LIFETIME * oneDay),
    // signed: true,
  });
  res.status(statusCode).json({ user, token });
};

module.exports = {
  createJWT,
  isValidToken,
  sendResponseWithCookie,
};

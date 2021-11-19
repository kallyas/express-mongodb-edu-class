const User = require("../models/user");
const bcrypt = require("bcryptjs");

const { sendResponseWithCookie } = require("../middlewares/jwt");

const register = async (req, res) => {
  //validate body
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  const result = await user.save();

  sendResponseWithCookie({
    res,
    statusCode: 201,
    user: {
      id: result._id,
      name: result.name,
      email: result.email,
    },
    options: { expiresIn: "1h" },
  });
};

const login = async (req, res) => {
  //validate body
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword)
    return res.status(400).json({ message: "Invalid Password" });

  sendResponseWithCookie({
    res,
    statusCode: 200,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    options: { expiresIn: "1h" },
  })
};

module.exports = {
  register,
  login,
};

const User = require('../models/user');

const getAllUsers = async (req, res) => {
    const users = await User.find({}).select('-password -__v');
    res.status(200).json(users)
}

// getUserByID

// Delete User

// updateUser

module.exports = {
    getAllUsers
}
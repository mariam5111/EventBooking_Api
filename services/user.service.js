const User = require("../models/user.model");
const AppError = require("../utils/appError");
const generateToken = require("../utils/generateToken");


const registerUser = async (userData) => {
  const { name, email, password, role } = userData;


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email is already registered", 400);
  }


  const user = await User.create({
    name,
    email,
    password,
    role: "User",
  });


  user.password = undefined;

  return user;
};


const loginUser = async ({ email, password }) => {

  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }


  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }


  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new AppError("Invalid email or password", 401);
  }

 
  const token = generateToken(user._id, user.role);


  user.password = undefined;

  return {
    user,
    token,
  };
};


const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
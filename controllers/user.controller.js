const userService = require("../services/user.service");


const register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


const login = async (req, res, next) => {
  try {
    const result = await userService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const getProfile = async (req, res, next) => {
  try {

    const user = await userService.getUserById(req.user._id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
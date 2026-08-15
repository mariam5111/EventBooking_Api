const jwt = require("jsonwebtoken");

/**
 * Generates a signed JWT Access Token
 * @param {string} userId - The unique MongoDB ID of the user
 * @param {string} role - The role of the user (e.g., 'User', 'Organizer', 'Admin')
 * @returns {string} The signed JWT token
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    }
  );
};

module.exports = generateToken;
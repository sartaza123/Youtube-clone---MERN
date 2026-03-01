const getProfile = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

function userRoutes(app) {
  // Get logged-in user profile
  app.get("/api/users/me", authMiddleware, getProfile);
}

module.exports = userRoutes;

import getProfile from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

function userRoutes(app) {
  // Get logged-in user profile
  app.get("/api/users/me", authMiddleware, getProfile);
}

export default userRoutes;

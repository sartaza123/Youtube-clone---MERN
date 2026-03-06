import { register, login } from "../controller/auth.controller.js";

function authRoutes(app) {
  // Register
  app.post("/api/auth/register", register);

  // Login
  app.post("/api/auth/login", login);
}

export default authRoutes;

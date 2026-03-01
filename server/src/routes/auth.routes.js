const { register, login } = require("../controller/auth.controller");

function authRoutes(app) {
  // Register
  app.post("/api/auth/register", register);

  // Login
  app.post("/api/auth/login", login);
}

module.exports = authRoutes;

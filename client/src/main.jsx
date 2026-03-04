import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Channel from "./pages/Channel";
import Search from "./pages/Search";
import Video from "./pages/Video";
import UploadVideo from "./pages/UploadVideo";
import CreateChannel from "./pages/CreateChannel";
import ProtectedRoute from "./components/ProtectedRoute";

import "nprogress/nprogress.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "channel/:id", element: <Channel /> },

      {
        path: "create-channel",
        element: (
          <ProtectedRoute>
            <CreateChannel />
          </ProtectedRoute>
        ),
      },

      {
        path: "upload",
        element: (
          <ProtectedRoute>
            <UploadVideo />
          </ProtectedRoute>
        ),
      },

      { path: "search", element: <Search /> },
      { path: "video/:id", element: <Video /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);

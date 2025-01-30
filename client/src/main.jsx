import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import App from "./components/App.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Admin from "./components/admin.jsx";
import About from "./components/about.jsx";
import UploadUsers from "./components/upload-users.jsx";
import AddUser from "./components/add-user.jsx";
import AllUsers from "./components/all-users.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/upload-users",
    element: <UploadUsers />,
  },
  {
    path: "/admin/add-user",
    element: <AddUser />,
  },
  {
    path: "/admin/all-users",
    element: <AllUsers />,
  },

  {
    path: "/about",
    element: <About />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);

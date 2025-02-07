import { useState, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../styles/index.css";
import Homepage from "./homepage.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import Admin from "./admin.jsx";
import AdminLogin from "./admin-login.jsx";
import About from "./about.jsx";
import UploadUsers from "./upload-users.jsx";
import AddUser from "./add-user.jsx";
import AllUsers from "./all-users.jsx";
import MyAccount from "./my-account.jsx";
import PointsHistory from "./points-history.jsx";

export const UserContext = createContext(null);
export const AdminContext = createContext(null);
const mainTitle = "Track Your Points";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage title={`Home - ${mainTitle}`} />,
    },
    {
      path: "/login",
      element: (
        <Login setUserInfo={setUserInfo} title={`Log In - ${mainTitle}`} />
      ),
    },
    {
      path: "/sign-up",
      element: <Signup title={`Sign Up - ${mainTitle}`} />,
    },
    {
      path: "/my-account",
      element: <MyAccount setUserInfo={setUserInfo} title={`My Account - ${mainTitle}`} />,
    },
    {
      path: "/admin",
      element: <Admin title={`Admin - ${mainTitle}`} />,
    },
    {
      path: "/admin/login",
      element: (
        <AdminLogin setAdminInfo={setAdminInfo} title="Admin - Log In" />
      ),
    },
    {
      path: "/admin/upload-users",
      element: <UploadUsers title="Admin - Upload User Sheet" />,
    },
    {
      path: "/admin/add-user",
      element: <AddUser title="Admin - Add User" />,
    },
    {
      path: "/admin/all-users",
      element: <AllUsers title="Admin - All Users" />,
    },
    {
      path: "/admin/points-history",
      element: <PointsHistory title="Admin - Points History" />,
    },
    {
      path: "/about",
      element: <About title={`About Us - ${mainTitle}`} />,
    },
  ]);

  return (
    <UserContext.Provider value={userInfo}>
      <AdminContext.Provider value={adminInfo}>
        <RouterProvider router={router}></RouterProvider>
      </AdminContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

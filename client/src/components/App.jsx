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

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: <Login setUserInfo={setUserInfo} />,
    },
    {
      path: "/sign-up",
      element: <Signup />,
    },
    {
      path: "/my-account",
      element: <MyAccount />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin setAdminInfo={setAdminInfo} />,
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
      path: "/admin/points-history",
      element: <PointsHistory />,
    },
    {
      path: "/about",
      element: <About />,
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

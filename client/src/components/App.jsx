import { useState, createContext, useEffect } from "react";
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
import BookVilla from "./book-villa.jsx";
import PointsHistory from "./points-history.jsx";
import { getUser } from "../helpers/user.js";
import { getAdminAccount } from "../helpers/admin.js";

export const UserContext = createContext(null);
export const AdminContext = createContext(null);

const mainTitle = "Track Your Points";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      getUser(token, userInfo, setUserInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("admin-token");
    if (adminToken) {
      getAdminAccount(adminToken, adminInfo, setAdminInfo);
    }
  }, [adminInfo]);

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
      element: (
        <MyAccount
          setUserInfo={setUserInfo}
          title={`My Account - ${mainTitle}`}
        />
      ),
    },
    {
      path: "/book-villa",
      element: <BookVilla title={`Book Villa - ${mainTitle}`} />,
    },
    {
      path: "/admin",
      element: (
        <Admin setAdminInfo={setAdminInfo} title={`Admin - ${mainTitle}`} />
      ),
    },
    {
      path: "/admin/login",
      element: (
        <AdminLogin setAdminInfo={setAdminInfo} title="Admin - Log In" />
      ),
    },
    {
      path: "/admin/upload-users",
      element: (
        <UploadUsers
          setAdminInfo={setAdminInfo}
          title="Admin - Upload User Sheet"
        />
      ),
    },
    {
      path: "/admin/add-user",
      element: <AddUser setAdminInfo={setAdminInfo} title="Admin - Add User" />,
    },
    {
      path: "/admin/all-users",
      element: (
        <AllUsers setAdminInfo={setAdminInfo} title="Admin - All Users" />
      ),
    },
    {
      path: "/admin/points-history",
      element: (
        <PointsHistory
          setAdminInfo={setAdminInfo}
          title="Admin - Points History"
        />
      ),
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

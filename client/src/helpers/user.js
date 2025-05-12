import { jwtDecode } from "jwt-decode";
import { URL } from "../main";

export async function getUser(token, userInfo, setUserInfo) {
  const decoded = jwtDecode(token);
  console.log(decoded);

  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();
  const timeUntilExpiration = expirationTime - currentTime;

  if (expirationTime < currentTime) {
    console.log("Token expired at:", new Date(expirationTime));
    console.log("Current time:", new Date(currentTime));
    sessionStorage.removeItem("token");
    setUserInfo(null);
    return;
  }

  console.log("Token valid until:", new Date(expirationTime));

  if (userInfo) {
    removeToken(setUserInfo, timeUntilExpiration);
    return;
  }

  try {
    const response = await fetch(`${URL}/api/account/user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log("get user info by token result: ", result);

    setUserInfo({
      id: result[0].id,
      name: `${result[0].firstName} ${result[0].lastName}`,
      email: result[0].email,
      points: result[0].points,
      bookingStatus: result[0].bookingStatus,
    });

    removeToken(setUserInfo, timeUntilExpiration);
  } catch (e) {
    console.error("Error getting user by token: ", e);
    return { error: e.message };
  }
}

function removeToken(setUserInfo, time) {
  setTimeout(() => {
    sessionStorage.removeItem("token");
    setUserInfo(null);
  }, time);
}

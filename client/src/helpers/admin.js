import { URL } from "../main";
import { jwtDecode } from "jwt-decode";

export async function getAdminAccount(token, adminInfo, setAdminInfo) {
  const decoded = jwtDecode(token);
  console.log(decoded);

  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();
  const timeUntilExpiration = expirationTime - currentTime;

  if (expirationTime < currentTime) {
    console.log("Token expired at:", new Date(expirationTime));
    console.log("Current time:", new Date(currentTime));
    sessionStorage.removeItem("admin-token");
    setAdminInfo(null);
    return;
  }

  console.log("Token valid until:", new Date(expirationTime));

  if (adminInfo) {
    removeToken(setAdminInfo, timeUntilExpiration);
    return;
  }

  try {
    const response = await fetch(`${URL}/api/admin/account`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log("get admin account by token result: ", result);

    setAdminInfo({
      id: result[0].id,
      email: result[0].email,
      date: result[0].dateCreated,
      time: result[0].timeCreated,
    });

    removeToken(setAdminInfo, timeUntilExpiration);
  } catch (e) {
    console.error("Error getting admin account by token: ", e);
    return { error: e.message };
  }
}

function removeToken(setAdminInfo, time) {
  setTimeout(() => {
    sessionStorage.removeItem("admin-token");
    setAdminInfo(null);
  }, time);
}

export async function handlePoints(path, user, points) {
  try {
    const response = await fetch(`${URL}/api/admin/${path}`, {
      method: "POST",
      headers: addAuthHeader(),
      body: JSON.stringify({
        userId: user,
        points,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (e) {
    console.error(e.message);
    return { error: e.message };
  }
}

export async function confirmBooking(user) {
  try {
    const response = await fetch(`${URL}/api/admin/confirm-booking`, {
      method: "POST",
      headers: addAuthHeader(),
      body: JSON.stringify({
        userId: user,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (e) {
    console.error(e.message);
    return { error: e.message };
  }
}

export function addAuthHeader() {
  const adminToken = sessionStorage.getItem("admin-token");
  if (adminToken)
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    };
}

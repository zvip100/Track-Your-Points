import { URL } from "../main";

export async function getTotalPoints(token) {
  try {
    const response = await fetch(`${URL}/api/account/total-points`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    console.log("Total-points fetch result: ", result);

    return result;
  } catch (e) {
    console.error("Error fetching total-points: ", e.message);
    return { error: e.message };
  }
}

export async function requestBooking(token, checkIn, checkOut) {
  try {
    const response = await fetch(`${URL}/api/account/book-villa`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        checkIn,
        checkOut,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    console.log("Request booking result: ", result);

    if (result === "User not found" || result === "Not enough points") {
      return { error: result };
    }
    return result;
  } catch (e) {
    console.error("Error requesting booking: ", e.message);
    return { error: e.message };
  }
}

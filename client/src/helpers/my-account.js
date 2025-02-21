import { URL } from "../main";

export async function getBookingInfo(token) {
  try {
    const response = await fetch(`${URL}/api/account/my-booking`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log("My-booking fetch result: ", result);

    return result;
  } catch (e) {
    console.error("Error getting my-booking: ", e.message);
    return { error: e.message };
  }
}

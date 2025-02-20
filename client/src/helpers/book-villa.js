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

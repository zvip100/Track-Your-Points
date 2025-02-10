import { URL } from "../main";

export async function handlePoints(path,user, points) {
  try {
    const response = await fetch(`${URL}/api/admin/${path}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
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

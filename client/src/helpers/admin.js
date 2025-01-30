export async function addPoints(user, points) {
  try {
    const response = await fetch("http://localhost:3000/admin/add-points", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user,
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

export const data = {
  name: "Moshe Fried",
  points: 2584,
};

console.log("Data: ", data);

export function stillNeeds() {
  const pointsToGo = 50000 - data.points;
  return pointsToGo;
}

export const person = {
  prefix: "Mr.",
  firstName: "ben",
  lastName: "Green",
  email: "ben@example.com",
  password: "123123",
  phone: "8456621010",
  points: 2025,
};

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
}

export function changeTitle(title) {
  document.title = title;
}

export function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

export function capitalize(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatEmail(str) {
  if (!str) return "";
  return str.toLowerCase();
}

export function removeAllSpaces(str) {
  if (!str) return "";
  return str.replace(/\s/g, "");
}

export function cleanWhitespace(str) {
  if (!str) return "";
  return str.trimStart().replace(/\s+/g, " ");
}

export function formatBookingDate(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatBookingStatus(status) {
  if (status === "P") {
    return "Pending";
  } else if (status === "C") {
    return "Confirmed";
  } else if (status === "R") {
    return "Rejected";
  }
}

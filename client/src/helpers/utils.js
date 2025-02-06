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

export function capitalize(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}



import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";

function configApiUrl() {
  const config = window.__CONFIG__;
  if (config === "##DEVELOPMENT##") return "http://localhost:3000";

  return "";
}

const getBaseUrl = configApiUrl();

export const URL = getBaseUrl;
console.log("Base URL:", URL);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

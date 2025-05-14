import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";

//export const URL = "http://localhost:3000";
//`${config.apiUrl}:${config.port}`

function configBaseUrl() {
  const config = window.__CONFIG__;
  if (config.apiUrl === "##API_URL##") return "http://localhost:3000";

  return "" ;
}

const getBaseUrl = configBaseUrl();

export const URL = getBaseUrl;
console.log("Base URL:", URL);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

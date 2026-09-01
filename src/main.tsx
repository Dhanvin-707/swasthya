import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { SwasthyaProvider } from "./context/SwasthyaContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SwasthyaProvider>
      <App />
    </SwasthyaProvider>
  </StrictMode>
);

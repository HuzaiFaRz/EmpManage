import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'react-tooltip/dist/react-tooltip.css'
import "react-toastify/ReactToastify.css";
import "../Style/index.css";
import App from "../Main_Components/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

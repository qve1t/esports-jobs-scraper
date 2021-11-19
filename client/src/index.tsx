import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CookiesBanner from "./components/CookiesBanner";
import { ThemeModule } from "./modules/ThemeModule";

ReactDOM.render(
  <React.StrictMode>
    <ThemeModule>
      <App />
      <CookiesBanner />
    </ThemeModule>
  </React.StrictMode>,
  document.getElementById("root")
);

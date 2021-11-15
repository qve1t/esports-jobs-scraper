import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CookiesBanner from "./components/CookiesBanner";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <CookiesBanner />
  </React.StrictMode>,
  document.getElementById("root")
);

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CookiesBanner from "./components/CookiesBanner";
import { ThemeModule } from "./modules/ThemeModule";
import LoadingComponent from "./components/LoadingComponent";

ReactDOM.render(
  <React.StrictMode>
    <ThemeModule>
      <Suspense fallback={<LoadingComponent />}>
        <App />
      </Suspense>
      <CookiesBanner />
    </ThemeModule>
  </React.StrictMode>,
  document.getElementById("root")
);

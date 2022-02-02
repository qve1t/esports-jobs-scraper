import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeModule } from "./modules/ThemeModule";
import LoadingComponent from "./components/LoadingComponent";
import { SearchModule } from "./modules/SearchModule";

ReactDOM.render(
  <React.StrictMode>
    <ThemeModule>
      <SearchModule>
        <Suspense fallback={<LoadingComponent />}>
          <App />
        </Suspense>
      </SearchModule>
    </ThemeModule>
  </React.StrictMode>,
  document.getElementById("root")
);

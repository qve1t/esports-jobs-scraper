import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import CookiesPage from "./pages/CookiesPage";
import MainPage from "./pages/MainPage";
import NoPage from "./pages/NoPage";
import OfferPage from "./pages/OfferPage";

const App = () => {
  return (
    <div className="main-area">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<CookiesPage />} />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

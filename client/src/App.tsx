import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CookiesBanner from "./components/CookiesBanner";

import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import CookiesPage from "./pages/CookiesPage";
import MainPage from "./pages/MainPage";
import NoPage from "./pages/NoPage";
import OfferPage from "./pages/OfferPage";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<CookiesPage />} />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <CookiesBanner />
      </Router>
    </>
  );
}

export default App;

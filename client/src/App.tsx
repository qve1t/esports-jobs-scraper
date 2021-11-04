import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
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
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

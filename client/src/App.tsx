import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CookiesBanner from "./components/CookiesBanner";

const Layout = lazy(() => import("./components/Layout"));
const LoadingComponent = lazy(() => import("./components/LoadingComponent"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CookiesPage = lazy(() => import("./pages/CookiesPage"));
const MainPage = lazy(() => import("./pages/MainPage"));
const NoPage = lazy(() => import("./pages/NoPage"));
const OfferPage = lazy(() => import("./pages/OfferPage"));

const App = () => {
  return (
    <div className="main-area">
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <MainPage />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="/privacy"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <CookiesPage />
                </Suspense>
              }
            />
            <Route
              path="/offer/:id"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <OfferPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<LoadingComponent />}>
                  <NoPage />
                </Suspense>
              }
            />
          </Routes>
        </Layout>
        <CookiesBanner />
      </Router>
    </div>
  );
};

export default App;

import { useEffect } from "react";
import Layout from "../components/Layout";
import Offers from "../components/Offers";
import useGaTracker from "../hooks/useGaTracker";

const MainPage = () => {
  useEffect(() => {
    document.title = "esports-GO";
  }, []);

  useGaTracker();

  return (
    <Layout>
      <Offers />
    </Layout>
  );
};

export default MainPage;

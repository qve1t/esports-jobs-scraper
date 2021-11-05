import { useEffect } from "react";
import Layout from "../components/Layout";
import Offers from "../components/Offers";

const MainPage = () => {
  useEffect(() => {
    document.title = "EsportsGO";
  }, []);

  return (
    <Layout>
      <Offers />
    </Layout>
  );
};

export default MainPage;

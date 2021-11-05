import { useEffect } from "react";
import NotFound from "../components/404";
import Layout from "../components/Layout";

const NoPage = () => {
  useEffect(() => {
    document.title = "EsportsGO";
  }, []);

  return (
    <Layout>
      <NotFound />
    </Layout>
  );
};

export default NoPage;

import { useEffect } from "react";
import NotFound from "../components/404";
import Layout from "../components/Layout";
import useGaTracker from "../hooks/useGaTracker";

const NoPage = () => {
  useEffect(() => {
    document.title = "esports-GO - Start your esport journey today";
  }, []);

  useGaTracker();

  return (
    <Layout>
      <NotFound />
    </Layout>
  );
};

export default NoPage;

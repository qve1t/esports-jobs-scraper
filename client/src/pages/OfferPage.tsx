import DetailedOffer from "../components/DetailedOffer";
import Layout from "../components/Layout";
import useGaTracker from "../hooks/useGaTracker";

const OfferPage = () => {
  useGaTracker();

  return (
    <Layout>
      <DetailedOffer />
    </Layout>
  );
};

export default OfferPage;

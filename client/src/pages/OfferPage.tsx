import DetailedOffer from "../components/DetailedOffer";
import useGaTracker from "../hooks/useGaTracker";

const OfferPage = () => {
  useGaTracker();

  return (
    <>
      <DetailedOffer />
    </>
  );
};

export default OfferPage;

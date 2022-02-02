import { useEffect } from "react";
import { OffersList, OffersWrapper } from "../components/Offers";
import SearchComponent from "../components/Search";
import useGaTracker from "../hooks/useGaTracker";

const MainPage = () => {
  useEffect(() => {
    document.title = "esports-GO: Start your esport journey today";
  }, []);

  useGaTracker();

  return (
    <OffersWrapper>
      <SearchComponent />
      <OffersList />
    </OffersWrapper>
  );
};

export default MainPage;

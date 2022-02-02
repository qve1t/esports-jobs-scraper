import { Helmet } from "react-helmet";
import { OffersList, OffersWrapper } from "../components/Offers";
import SearchComponent from "../components/Search";
import useGaTracker from "../hooks/useGaTracker";

const MainPage = () => {
  useGaTracker();

  return (
    <OffersWrapper>
      <Helmet>
        <title>{"esports-GO: Start your esport journey today"}</title>
      </Helmet>
      <SearchComponent />
      <OffersList />
    </OffersWrapper>
  );
};

export default MainPage;

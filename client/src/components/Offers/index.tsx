import { useEffect } from "react";
import { getOffersList } from "../../api/offers";

import LoadingComponent from "../LoadingComponent";
import OffersWrapper from "./OffersWrapper";

const Offers = () => {
  useEffect(() => {
    const getOffers = async () => {
      const response = await getOffersList({ search: "", limit: 15, page: 0 });
      console.log(response);
    };

    getOffers();
  }, []);

  return (
    <OffersWrapper>
      <LoadingComponent />
    </OffersWrapper>
  );
};

export default Offers;

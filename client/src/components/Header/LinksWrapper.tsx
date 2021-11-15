import AboutLink from "./AboutLink";
import OfferLink from "./OfferLink";

const LinksWrapper = () => {
  return (
    <div className="flex ml-2 gap-4 sm:gap-6">
      <OfferLink />
      <AboutLink />
    </div>
  );
};

export default LinksWrapper;

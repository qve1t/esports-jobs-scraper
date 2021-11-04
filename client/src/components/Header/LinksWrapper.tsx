import AboutLink from "./AboutLink";
import OfferLink from "./OfferLink";

const LinksWrapper = () => {
  return (
    <div className="flex gap-6">
      <OfferLink />
      <AboutLink />
    </div>
  );
};

export default LinksWrapper;

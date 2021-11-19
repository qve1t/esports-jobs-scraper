import AboutLink from "./AboutLink";
import OfferLink from "./OfferLink";
import Theme from "./Theme";

const LinksWrapper = () => {
  return (
    <div className="flex ml-2 gap-4 sm:gap-6 items-center">
      <OfferLink />
      <AboutLink />
      <Theme />
    </div>
  );
};

export default LinksWrapper;

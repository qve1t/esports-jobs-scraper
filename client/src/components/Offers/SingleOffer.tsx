import { Link } from "react-router-dom";
import { SimpleJobOffer } from "../../interfaces/JobOffer.interface";
import OrgLogo from "../../logos";

const SingleOffer = ({ _id, company, location, name }: SimpleJobOffer) => {
  return (
    <Link
      to={`/offer/${_id}`}
      target="_blank"
      className="flex flex-col items-center sm:flex-row gap-0.5 sm:gap-5 px-2 py-2 my-1 rounded-md text-lg border-2  dark:text-gray-200 border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-900 transition-colors hover:bg-pink-50 dark:hover:bg-pink-900 hover:border-pink-300 dark:hover:border-pink-600"
    >
      <OrgLogo name={company} />
      <div>{name}</div>
      <div className="font-bold">{location}</div>
    </Link>
  );
};

export default SingleOffer;

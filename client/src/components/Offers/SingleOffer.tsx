import { Link } from "react-router-dom";
import { SimpleJobOffer } from "../../interfaces/JobOffer.interface";

const SingleOffer = ({ _id, company, location, name }: SimpleJobOffer) => {
  return (
    <Link
      to={`/offer/${_id}`}
      className="flex flex-col sm:flex-row gap-0.5 sm:gap-5 px-2 py-4 my-1 rounded-md border-2 border-pink-200 bg-white transition-colors hover:bg-pink-50 hover:border-pink-300"
    >
      <div className="font-bold">{company}</div>
      <div>{name}</div>
      <div className="font-bold">{location}</div>
    </Link>
  );
};

export default SingleOffer;

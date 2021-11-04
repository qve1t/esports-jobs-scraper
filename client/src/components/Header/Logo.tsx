import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-3xl">
      <Link to="/">
        esports<span className="text-pink-700 font-bold ">GO</span>
      </Link>
    </div>
  );
};

export default Logo;

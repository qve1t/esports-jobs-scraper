import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-2xl sm:text-3xl dark:text-white">
      <Link to="/">
        esports<span className="text-pink-700 font-bold ">-GO</span>
      </Link>
    </div>
  );
};

export default Logo;

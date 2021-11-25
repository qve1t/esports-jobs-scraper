import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center text-2xl sm:text-3xl dark:text-gray-200">
      <Link to="/">
        esports<span className="text-pink-700 font-bold ">-GO</span>
      </Link>
      <span className="text-base ml-4 pl-2 border-l-2 dark:text-gray-200 border-gray-500 dark:border-gray-200">
        Start your esport journey today
      </span>
    </div>
  );
};

export default Logo;

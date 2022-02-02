import { useEffect } from "react";
import useGaTracker from "../hooks/useGaTracker";

const NoPage = () => {
  useEffect(() => {
    document.title = "esports-GO: Start your esport journey today";
  }, []);

  useGaTracker();

  return (
    <div className="text-5xl dark:text-white text-gray-200 ">
      <span className="text-pink-700 font-bold text-9xl">404</span> page not
      found!
    </div>
  );
};

export default NoPage;

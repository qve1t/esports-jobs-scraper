import { useEffect } from "react";
import Offers from "../components/Offers";
import useGaTracker from "../hooks/useGaTracker";

const MainPage = () => {
  useEffect(() => {
    document.title = "esports-GO: Start your esport journey today";
  }, []);

  useGaTracker();

  return (
    <>
      <Offers />
    </>
  );
};

export default MainPage;

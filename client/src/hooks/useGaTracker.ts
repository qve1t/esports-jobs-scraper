import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

const useGaTracker = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (
      !window.location.href.includes("localhost") &&
      !window.location.href.includes("atthost24")
    ) {
      ReactGA.initialize("G-V64QLDYEWE");
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
      console.log();
    }
  }, [initialized]);
};

export default useGaTracker;

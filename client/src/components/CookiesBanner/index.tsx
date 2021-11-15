import Cookies from "js-cookie";
import { useState } from "react";
import { StandardButton } from "../Buttons";

const setCookie = () => {
  Cookies.set("policyAccept", "1", {
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  });
};

const getCookie = () => {
  return Cookies.get("policyAccept");
};

const CookiesBanner = () => {
  const [show, setShow] = useState<string | undefined>(getCookie());

  if (show === undefined) {
    return (
      <div className="sticky bottom-0 z-10 w-screen min-h-28 px-5 py-7 mx-sc bg-gray-100 border-t-2 border-pink-400  shadow-md">
        <div className="flex flex-row items-center max-w-screen-xl mx-4 xl:mx-auto">
          <p>
            <span className="font-bold">Notice.</span> EsportsGo uses cookies to
            provide necessary website functionality, improve your experience and
            analyze traffic. By using our website, you agree to{" "}
            <a
              href="/privacy"
              target="_blank"
              className="text-pink-400 underline"
            >
              our Privacy Policy
            </a>{" "}
            and our cookies usage.
          </p>
          <StandardButton
            text="Ok"
            onClick={() => {
              setCookie();
              setShow("1");
            }}
          />
        </div>
      </div>
    );
  }

  return <></>;
};

export default CookiesBanner;

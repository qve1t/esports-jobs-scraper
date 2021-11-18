import { useEffect } from "react";
import Layout from "../components/Layout";
import useGaTracker from "../hooks/useGaTracker";

const AboutPage = () => {
  useEffect(() => {
    document.title = "esports-GO";
  }, []);
  useGaTracker();
  return (
    <Layout>
      <h1 className="text-5xl text-center my-8 text-pink-500">
        Welcome to esports-Go
      </h1>
      <div className="whitespace-pre-wrap">
        This website was created to help you start your esports adventure. You
        do not have to be a player to be a part of players community. Many
        organizations are searching for people to work with social media,
        content creating or event software developers.{`\n\n`}When I was looking
        for a job in esports, it was always annoying to me that I have to enter
        the main page of every organization that I am intrested in. It was
        taking to much time. There are pages including esports job offers but
        these were tech positions mostly. I was not able to find any page with
        esports offers only. I wanted to change it. Here you can find job offers
        of more or less known esports organizations. Those are collected from
        their webpages, so you do not have to visiting all of them. You can find
        everything in one place.
        {`\n\n`}Offers from new companies will be successively adding. If you
        find any bugs, have ideas to improve page or you find a new job thanks
        to this page, feel free to{" "}
        <a className="text-pink-500" href="mailto: contact@esports-go.net">
          contact me.
        </a>
      </div>
    </Layout>
  );
};

export default AboutPage;

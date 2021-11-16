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
      <h1 className="text-5xl text-center my-8">Hello there</h1>
      <div className="whitespace-pre-wrap">
        This website was created to help you start your esports adventure. You
        do not have to be a player to be a part of players community. Many
        organizations are searching for people to work with social media or
        content creating.{`\n\n`}Here you can find offers of more or less known
        esports organizations. They are collected from their webpages, so you do
        not have to visiting all of them. You can find everything in one place.
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

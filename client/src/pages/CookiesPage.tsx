import { useEffect } from "react";
import Layout from "../components/Layout";
import useGaTracker from "../hooks/useGaTracker";

const Paragraph = ({ children }: { children: string }) => {
  return <p className="py-4">{children}</p>;
};

const Header = ({ children }: { children: string }) => {
  return <h3 className="font-bold">{children}</h3>;
};

const CookiesPage = () => {
  useEffect(() => {
    document.title = "esports-GO - Start your esport journey today";
  }, []);

  useGaTracker();

  return (
    <Layout>
      <h1 className="text-5xl">Cookie Policy for esports-GO</h1>

      <Paragraph>
        This is the Cookie Policy for esports-GO, accessible from
        http://esports-go.net
      </Paragraph>

      <Header>What Are Cookies</Header>

      <Paragraph>
        As is common practice with almost all professional websites this site
        uses cookies, which are tiny files that are downloaded to your computer,
        to improve your experience. This page describes what information they
        gather, how we use it and why we sometimes need to store these cookies.
        We will also share how you can prevent these cookies from being stored
        however this may downgrade or 'break' certain elements of the sites
        functionality.
      </Paragraph>

      <Header>How We Use Cookies</Header>

      <Paragraph>
        We use cookies for a variety of reasons detailed below. Unfortunately in
        most cases there are no industry standard options for disabling cookies
        without completely disabling the functionality and features they add to
        this site. It is recommended that you leave on all cookies if you are
        not sure whether you need them or not in case they are used to provide a
        service that you use.
      </Paragraph>

      <Header>Disabling Cookies</Header>

      <Paragraph>
        You can prevent the setting of cookies by adjusting the settings on your
        browser (see your browser Help for how to do this). Be aware that
        disabling cookies will affect the functionality of this and many other
        websites that you visit. Disabling cookies will usually result in also
        disabling certain functionality and features of the this site. Therefore
        it is recommended that you do not disable cookies.
      </Paragraph>

      <Header>The Cookies We Set</Header>

      <Paragraph> </Paragraph>

      <ul className="list-disc list-outside ml-4">
        <li>
          <p>Site preferences cookies</p>
          <Paragraph>
            In order to provide you with a great experience on this site we
            provide the functionality to set your preferences for how this site
            runs when you use it. In order to remember your preferences we need
            to set cookies so that this information can be called whenever you
            interact with a page is affected by your preferences.
          </Paragraph>
        </li>
      </ul>

      <Header>Third Party Cookies</Header>

      <Paragraph>
        In some special cases we also use cookies provided by trusted third
        parties. The following section details which third party cookies you
        might encounter through this site.
      </Paragraph>

      <ul className="list-disc list-outside ml-4">
        <li>
          <Paragraph>
            This site uses Google Analytics which is one of the most widespread
            and trusted analytics solution on the web for helping us to
            understand how you use the site and ways that we can improve your
            experience. These cookies may track things such as how long you
            spend on the site and the pages that you visit so we can continue to
            produce engaging content.
          </Paragraph>
          <Paragraph>
            For more information on Google Analytics cookies, see the official
            Google Analytics page.
          </Paragraph>
        </li>
      </ul>

      <Header>More Information</Header>

      <Paragraph>
        Hopefully that has clarified things for you and as was previously
        mentioned if there is something that you aren't sure whether you need or
        not it's usually safer to leave cookies enabled in case it does interact
        with one of the features you use on our site.
      </Paragraph>

      <Paragraph>
        However if you are still looking for more information then you can
        contact us through one of our preferred contact methods:
      </Paragraph>

      <ul className="list-disc list-outside ml-4">
        <li>Email: contact@esports-go.net</li>
      </ul>
    </Layout>
  );
};

export default CookiesPage;

import Layout from "../components/Layout";
import Offers from "../components/Offers";
import SearchComponent from "../components/Search";

const MainPage = () => {
  return (
    <Layout>
      <SearchComponent />
      <Offers />
    </Layout>
  );
};

export default MainPage;

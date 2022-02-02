import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import { getOfferDetails } from "../api/offers";
import { JobOffer } from "../interfaces/JobOffer.interface";
import { PageLoadingStateInterface } from "../interfaces/pageState.interface";
import { LinkButton } from "../components/Buttons";
import CompanyLink from "../components/CompanyLink";
import ErrorComponent from "../components/ErrorComponent";
import LoadingComponent from "../components/LoadingComponent";
import useGaTracker from "../hooks/useGaTracker";

const OfferPage = () => {
  useGaTracker();

  const [data, setData] = useState<JobOffer | null>(null);
  const [pageLoadingState, setPageLoadingState] =
    useState<PageLoadingStateInterface>({
      error: null,
      loading: true,
    });
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getOfferDetails(id || "");

      if (fetchedData.response) {
        setPageLoadingState({ loading: false, error: null });
        setData(fetchedData.response);
      } else {
        setPageLoadingState({ loading: false, error: fetchedData.error });
      }
    };

    fetchData();
  }, [id]);

  if (pageLoadingState.loading) {
    return <LoadingComponent />;
  }

  if (pageLoadingState.error) {
    return <ErrorComponent error={pageLoadingState.error} />;
  }

  return (
    <>
      <Helmet>
        <title>
          {data?.name || "esports-GO: Start your esport journey today"}
        </title>
      </Helmet>
      <div className=" dark:text-opacity-80">
        <div className="flex justify-between">
          <div>
            <p>
              Organization: <CompanyLink company={data?.company || ""} />
            </p>
            <p>
              Location:<span className="font-bold"> {data?.location}</span>
            </p>
          </div>
          <LinkButton url={data?.url || ""} text="Full offer" />
        </div>
        <h1 className="text-5xl text-center my-8">{data?.name}</h1>
        <div className="whitespace-pre-wrap">{data?.description}</div>
        <div className="flex justify-start mt-8">
          <LinkButton url={data?.url || ""} text="Full offer" />
        </div>
      </div>
    </>
  );
};

export default OfferPage;

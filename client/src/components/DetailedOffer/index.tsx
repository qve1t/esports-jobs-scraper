import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOfferDetails } from "../../api/offers";
import { JobOffer } from "../../interfaces/JobOffer.interface";
import { PageLoadingStateInterface } from "../../interfaces/pageState.interface";
import { LinkButton } from "../Buttons";
import CompanyLink from "../CompanyLink";
import ErrorComponent from "../ErrorComponent";
import LoadingComponent from "../LoadingComponent";

const DetailedOffer = () => {
  const [data, setData] = useState<JobOffer | null>(null);
  const [pageLoadingState, setPageLoadingState] =
    useState<PageLoadingStateInterface>({
      error: null,
      loading: true,
    });
  const { id } = useParams();

  useEffect(() => {
    document.title =
      data?.name || "esports-GO: Start your esport journey today";
  }, [data?.name]);

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
  );
};

export default DetailedOffer;

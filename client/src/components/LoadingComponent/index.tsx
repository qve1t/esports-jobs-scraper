import Loader from "../../icons/loader.svg";

const LoadingComponent = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <img src={Loader} alt="Loading..." className="w-12 h-12 animate-spin" />
    </div>
  );
};

export default LoadingComponent;

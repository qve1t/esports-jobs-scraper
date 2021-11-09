const LoadingComponent = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <img
        src={process.env.PUBLIC_URL + "/loader.svg"}
        alt="Loading..."
        className="w-12 h-12 animate-spin"
      />
    </div>
  );
};

export default LoadingComponent;

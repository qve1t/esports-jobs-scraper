interface OffersWrapperProps {
  children?: React.ReactNode;
}

const OffersWrapper = ({ children }: OffersWrapperProps) => {
  return <div className="flex flex-col mt-8">{children}</div>;
};

export default OffersWrapper;

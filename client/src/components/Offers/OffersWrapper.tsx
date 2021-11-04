interface OffersWrapperProps {
  children?: React.ReactNode;
}

const OffersWrapper = ({ children }: OffersWrapperProps) => {
  return <div className="flex flex-col">{children}</div>;
};

export default OffersWrapper;

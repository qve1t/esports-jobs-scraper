interface OffersWrapperProps {
  children?: React.ReactNode;
}

const OffersWrapper = ({ children }: OffersWrapperProps) => {
  return <div className="flex flex-col mb-4">{children}</div>;
};

export default OffersWrapper;

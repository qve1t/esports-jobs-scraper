interface HeaderWrapperProps {
  children?: React.ReactNode;
}

const HeaderWrapper = ({ children }: HeaderWrapperProps) => {
  return (
    <header className="flex h-16 px-4 sm:px-10 items-center justify-between bg-gray-100 border-b-2 border-pink-400 shadow-md">
      {children}
    </header>
  );
};

export default HeaderWrapper;

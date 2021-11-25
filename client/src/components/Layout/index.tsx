interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col max-w-screen-xl mx-4 xl:mx-auto my-8 px-4 py-8 rounded-md  dark:text-gray-200 bg-gray-100 shadow-lg dark:bg-gray-800">
      {children}
    </div>
  );
};

export default Layout;

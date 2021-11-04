interface ErrorComponentInterface {
  error: string;
}

const ErrorComponent = ({ error }: ErrorComponentInterface) => {
  return (
    <div className="px-2 py-4 rounded-md border-2 border-red-500 text-red-500 bg-red-200">
      {error}
    </div>
  );
};

export default ErrorComponent;

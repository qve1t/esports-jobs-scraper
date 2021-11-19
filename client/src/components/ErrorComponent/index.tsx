interface ErrorComponentProps {
  error: string;
}

const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <div className="px-2 py-4 rounded-md border-2 border-red-500 text-red-500 bg-red-200 dark:bg-red-700">
      {error}
    </div>
  );
};

export default ErrorComponent;

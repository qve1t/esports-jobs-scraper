interface ButtonProps {
  disabled?: boolean;
  onClick: () => void;
  text: string;
  className?: string;
}

interface LinkButtonProps {
  url: string;
  text: string;
}

export const StandardButton = ({
  disabled,
  onClick,
  text,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 ml-2 h-11 rounded-md border-2 border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-900 text-pink-500 dark:text-pink-600 hover:text-white dark:hover:text-gray-900 hover:bg-pink-500 dark:hover:bg-pink-500 hover:border-pink-500 dark:hover:border-pink-500 transition-colors disabled:cursor-default disabled:bg-white dark:disabled:bg-gray-900 disabled:text-pink-500 dark:disabled:text-pink-500 disabled:border-pink-200 dark:disabled:border-pink-500 disabled:opacity-50 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const LinkButton = ({ url, text }: LinkButtonProps) => {
  return (
    <a
      href={url}
      rel="noreferrer"
      target="_blank"
      className="px-4 py-2 w-max h-11 rounded-md border-2 border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-900 text-pink-500 dark:text-pink-600 hover:text-white dark:hover:text-gray-900 hover:bg-pink-500 dark:hover:bg-pink-500 hover:border-pink-500 dark:hover:border-pink-500 transition-colors"
    >
      {text}
    </a>
  );
};

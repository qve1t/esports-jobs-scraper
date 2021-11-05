interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  text: string;
}

interface LinkButtonProps {
  url: string;
  text: string;
}

export const StandardButton = ({ disabled, onClick, text }: ButtonProps) => {
  return (
    <button
      className="px-4 py-2 ml-2 rounded-md border-2 border-pink-200 bg-white text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-colors disabled:cursor-default disabled:bg-white disabled:text-pink-500 disabled:border-pink-200 disabled:opacity-50"
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
      className="px-4 py-2 w-max h-auto rounded-md border-2 border-pink-200 bg-white text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-colors"
    >
      {text}
    </a>
  );
};

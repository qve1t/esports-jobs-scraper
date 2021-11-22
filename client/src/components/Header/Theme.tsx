import Dark from "../../icons/dark.svg";
import Light from "../../icons/light.svg";
import { useIsDark, useSetDark } from "../../modules/ThemeModule";

const Theme = () => {
  const isDark = useIsDark();
  const setDark = useSetDark();
  return (
    <div className="flex w-8 h-8 bg-gray-800 dark:bg-white rounded-full items-center justify-center cursor-pointer">
      <img
        className="w-6 h-6 "
        src={isDark ? Light : Dark}
        alt="Theme"
        onClick={() => setDark(!isDark)}
      />
    </div>
  );
};

export default Theme;

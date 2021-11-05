import G2 from "./g2.png";
import Fnatic from "./fnatic.png";
import Vitality from "./vitality.png";
import Excel from "./excel.png";

interface LogoProps {
  name: string;
}

const getImage = (name: string) => {
  switch (name) {
    case "G2":
      return G2;
    case "Fnatic":
      return Fnatic;
    case "Vitality":
      return Vitality;
    case "Excel":
      return Excel;
  }
};

const OrgLogo = ({ name }: LogoProps) => {
  return <img src={getImage(name)} alt="name" className="w-6 h-6" />;
};

export default OrgLogo;

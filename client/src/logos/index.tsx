import G2 from "./g2.png";
import Fnatic from "./fnatic.png";
import Vitality from "./vitality.png";
import Excel from "./excel.png";
import C9 from "./c9.png";
import TL from "./tl.png";
import Thieves from "./100thieves.png";
import EG from "./eg.png";
import Dignitas from "./dig.png";
import Immortals from "./immortals.png";
import Complexity from "./complexity.png";
import GG from "./gg.png";
import Heroic from "./heroic.png";
import Nip from "./nip.png";
import Clg from "./clg.png";

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
    case "Cloud9":
      return C9;
    case "Team Liquid":
      return TL;
    case "100 Thieves":
      return Thieves;
    case "Evil Geniuses":
      return EG;
    case "Dignitas":
      return Dignitas;
    case "Immortals":
      return Immortals;
    case "Complexity":
      return Complexity;
    case "Golden Guardians":
      return GG;
    case "Heroic":
      return Heroic;
    case "Ninjas in Pyjamas":
      return Nip;
    case "CLG":
      return Clg;
  }
};

const OrgLogo = ({ name }: LogoProps) => {
  return <img src={getImage(name)} alt={name} className="w-6 h-6" />;
};

export default OrgLogo;

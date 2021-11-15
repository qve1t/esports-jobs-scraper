import G2 from "./g2.svg";
import Fnatic from "./fnatic.svg";
import Vitality from "./vitality.svg";
import Excel from "./excel.svg";
import C9 from "./c9.svg";
import TL from "./tl.svg";
import Thieves from "./100thieves.svg";
import EG from "./eg.svg";
import Dignitas from "./dig.svg";
import Immortals from "./immortals.svg";
import Complexity from "./complexity.svg";
import GG from "./gg.svg";
import Heroic from "./heroic.svg";
import Nip from "./nip.svg";
import Clg from "./clg.svg";
import Rekt from "./rekt.svg";
import Guild from "./guild.svg";
import Overactive from "./overactive.svg";

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
    case "ReKTGlobal":
      return Rekt;
    case "Guild Esports":
      return Guild;
    case "OverActive Media":
      return Overactive;
  }
};

const OrgLogo = ({ name }: LogoProps) => {
  return <img src={getImage(name)} alt={name} className="w-8 h-8" />;
};

export default OrgLogo;

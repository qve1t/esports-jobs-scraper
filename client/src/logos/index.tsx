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
import Tsm from "./tsm.svg";
import Riot from "./riot.svg";
import V1 from "./v1.svg";
import Astralis from "./astralis.svg";

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
    case "TSM":
      return Tsm;
    case "Riot":
      return Riot;
    case "Version1":
      return V1;
    case "Astralis":
      return Astralis;
  }
};

const OrgLogo = ({ name }: LogoProps) => {
  return (
    <div className="flex w-12 h-12 dark:bg-white rounded-full items-center justify-center overflow-hidden">
      <img src={getImage(name)} alt={name} className="w-10 h-10" />
    </div>
  );
};

export default OrgLogo;

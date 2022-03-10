interface LogoProps {
  name: string;
}

const getImage = (name: string) => {
  switch (name) {
    case "G2":
      return process.env.PUBLIC_URL + "/images/g2.svg";
    case "Fnatic":
      return process.env.PUBLIC_URL + "/images/fnatic.svg";
    case "Vitality":
      return process.env.PUBLIC_URL + "/images/vitality.svg";
    case "Excel":
      return process.env.PUBLIC_URL + "/images/excel.svg";
    case "Cloud9":
      return process.env.PUBLIC_URL + "/images/c9.svg";
    case "Team Liquid":
      return process.env.PUBLIC_URL + "/images/tl.svg";
    case "100 Thieves":
      return process.env.PUBLIC_URL + "/images/100thieves.svg";
    case "Evil Geniuses":
      return process.env.PUBLIC_URL + "/images/eg.svg";
    case "Dignitas":
      return process.env.PUBLIC_URL + "/images/dig.svg";
    case "Immortals":
      return process.env.PUBLIC_URL + "/images/immortals.svg";
    case "Complexity":
      return process.env.PUBLIC_URL + "/images/complexity.svg";
    case "Golden Guardians":
      return process.env.PUBLIC_URL + "/images/gg.svg";
    case "Heroic":
      return process.env.PUBLIC_URL + "/images/heroic.svg";
    case "Ninjas in Pyjamas":
      return process.env.PUBLIC_URL + "/images/nip.svg";
    case "CLG":
      return process.env.PUBLIC_URL + "/images/clg.svg";
    case "ReKTGlobal":
      return process.env.PUBLIC_URL + "/images/rekt.svg";
    case "Guild Esports":
      return process.env.PUBLIC_URL + "/images/guild.svg";
    case "OverActive Media":
      return process.env.PUBLIC_URL + "/images/overactive.svg";
    case "TSM":
      return process.env.PUBLIC_URL + "/images/tsm.svg";
    case "Riot":
      return process.env.PUBLIC_URL + "/images/riot.svg";
    case "Version1":
      return process.env.PUBLIC_URL + "/images/v1.svg";
    case "Astralis":
      return process.env.PUBLIC_URL + "/images/astralis.svg";
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

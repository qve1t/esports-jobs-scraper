interface CompanyLinkProps {
  company: string;
}

const getLink = (org: string) => {
  switch (org) {
    case "G2":
      return "https://g2esports.com/";
    case "Fnatic":
      return "https://fnatic.com/";
    case "Vitality":
      return "https://vitality.gg/en/";
    case "Excel":
      return "https://xl.gg/";
    case "Cloud9":
      return "https://cloud9.gg/";
    case "Team Liquid":
      return "https://www.teamliquid.com/";
    case "100 Thieves":
      return "https://100thieves.com/";
    case "Evil Geniuses":
      return "https://evilgeniuses.gg/";
    case "Dignitas":
      return "https://dignitas.gg/";
    case "Immortals":
      return "https://immortals.gg/";
    case "Complexity":
      return "https://complexity.gg/";
    case "Golden Guardians":
      return "https://www.goldenguardians.com/";
    case "Heroic":
      return "https://www.heroic.gg/";
    case "Ninjas in Pyjamas":
      return "https://nip.gl/";
    case "CLG":
      return "https://www.clg.gg/";
    case "ReKTGlobal":
      return "https://rektglobal.com/";
    case "Guild Esports":
      return "https://guildesports.com/";
    case "OverActive Media":
      return "https://overactivemedia.com/";
    case "TSM":
      return "https://tsm.gg/";
    case "Riot":
      return "https://www.riotgames.com/";
    case "Version1":
      return "https://version1.gg/";
    case "Astralis":
      return "https://www.astralis.gg/";
  }
};

const CompanyLink = ({ company }: CompanyLinkProps) => {
  return (
    <a
      className="font-bold text-pink-700"
      href={getLink(company)}
      target="_blank"
      rel="noreferrer"
    >
      {company}
    </a>
  );
};

export default CompanyLink;

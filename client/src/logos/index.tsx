import G2 from "./g2.png";
import Fnatic from "./fnatic.png";

interface LogoProps {
  name: string;
}

const getImage = (name: string) => {
  switch (name) {
    case "G2":
      return G2;
    case "Fnatic":
      return Fnatic;
  }
};

const OrgLogo = ({ name }: LogoProps) => {
  console.log(name);
  return <img src={getImage(name)} alt="name" className="w-6 h-6" />;
};

export default OrgLogo;

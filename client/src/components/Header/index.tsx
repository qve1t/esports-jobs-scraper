import HeaderWrapper from "./HeaderWrapper";
import LinksWrapper from "./LinksWrapper";
import Logo from "./Logo";

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <LinksWrapper />
    </HeaderWrapper>
  );
};

export default Header;

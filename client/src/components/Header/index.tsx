import AboutLink from "./AboutLink";
import HeaderWrapper from "./HeaderWrapper";
import Logo from "./Logo";

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <AboutLink />
    </HeaderWrapper>
  );
};

export default Header;

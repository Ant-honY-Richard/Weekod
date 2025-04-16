import Navbar from './Navbar';

type HeaderProps = {
  toggleMobileMenu: () => void;
};

const Header = ({ toggleMobileMenu }: HeaderProps) => {
  return <Navbar />;
};

export default Header;

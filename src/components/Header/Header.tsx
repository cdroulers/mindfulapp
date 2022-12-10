import logo from "../../logo.png";

import "./Header.styles.scss";

export interface HeaderProps {}

function Header(props: HeaderProps) {
  return (
    <header className="app-header">
      <h1>
        <img src={logo} alt="Mindful logo" /> Mindful App
      </h1>
    </header>
  );
}

export default Header;

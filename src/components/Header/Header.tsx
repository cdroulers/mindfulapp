import { useTranslation } from "react-i18next";
import logo from "../../logo.png";

import "./Header.styles.scss";

export interface HeaderProps {}

function Header(props: HeaderProps) {
  const [t] = useTranslation("Header");
  return (
    <header className="app-header">
      <h1>
        <img src={logo} alt="Mindful logo" /> {t("title")}
      </h1>
    </header>
  );
}

export default Header;

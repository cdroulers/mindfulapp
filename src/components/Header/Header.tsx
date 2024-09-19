import { useState, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import "./Header.styles.scss";
import i18n from "../../initializers/i18next";
import logo from "../../logo.png";
import version from "../../version.json";
import { exportAll } from "../../data/db";

export interface HeaderProps {}

function Header(props: HeaderProps) {
  const [t] = useTranslation("Header");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  const handleExport = async () => {
    await exportAll();
  };

  return (
    <AppBar position="fixed" className="app-header">
      <Toolbar style={{ minHeight: "auto" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          {i18n.language !== "fr" && <MenuItem onClick={() => changeLang("fr")}>Français</MenuItem>}
          {i18n.language !== "en" && <MenuItem onClick={() => changeLang("en")}>English</MenuItem>}
          <MenuItem>
            <Link href="https://github.com/cdroulers/mindfulapp">Source</Link>
          </MenuItem>
          <MenuItem onClick={handleExport}>{t("exportData")}</MenuItem>
          <MenuItem disabled>v{version.name}</MenuItem>
        </Menu>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Mindful logo" /> {t("title")}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

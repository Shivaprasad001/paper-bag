import { useState } from "react";
import { NavLink } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { MAIN_MENU } from "../../constants/mainMenu";

const showMenuIcon = (menuName, isActive) => {
  const color = isActive ? '#ffffff' : '#4f4f4f';
  const sxSettings = { width: 30, height: 30, color:  color};

  switch (menuName) {
    case "Home":
      return <HomeOutlinedIcon sx={sxSettings} />;
    case "Profile":
      return <PersonOutlineOutlinedIcon sx={sxSettings} />;
  }
};

export default function SideNav() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const handleToggleSideNav = () =>
    setIsSideNavOpen((isSideNavOpen) => !isSideNavOpen);

  const classes = isSideNavOpen ? "main-side-nav open" : "main-side-nav";
  return (
    <div className={classes}>
      <button className="expand-collapse-icon" onClick={handleToggleSideNav}>
        {
          <KeyboardArrowRightIcon
            sx={{ width: 40, height: 40, color: "#1B5572" }}
          />
        }
      </button>
      <List>
        {MAIN_MENU.map((menuItem, index) => (
          <NavLink
            key={menuItem.menuText}
            to={menuItem.path}
            className={({ isActive }) => (isActive ? "active side-nav-link" : "side-nav-link")}
            end
          >
            {({isActive}) => (
                <ListItem  disablePadding className="side-nav-list-item">
                <ListItemButton className="side-nav-list-item-btn">
                  <ListItemIcon className="side-nav-list-item-icon">{showMenuIcon(menuItem.menuText, isActive)}</ListItemIcon>
                  <ListItemText
                    primary={menuItem.menuText}
                    className="side-nav-list-item-text"
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        ))}
      </List>
    </div>
  );
}

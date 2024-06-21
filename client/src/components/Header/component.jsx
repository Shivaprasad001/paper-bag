import { useState } from "react";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DefaultProfilePic from '../../assets/default-profile-picture.jpg';
import ProfileIcon from '../../assets/user-icon.svg';
import LogoutIcon from '../../assets/logout-circle.svg';

import Logo from "../../assets/logo.svg";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <header className="pb-main-header">
      <div className="logo-section">
        <img src={Logo} alt="Paper Bag Logo" />
        <span className="site-title">Paper Bag</span>
      </div>
      <div className="right-section">
        <div className="profile-picture-section">
          <div className="profile-pic-wrapper">
            <img src={DefaultProfilePic} alt="Profile Image" className="profile-image" />
          </div>
          <span className="logged-in-user-name">John Smith</span>
        </div>
        <div className="settings-section">
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {<KeyboardArrowDownIcon  sx={{color: '#313131'}}/>}
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose} className="profile-menu-item"><img src={ProfileIcon} className="profile-menu-item__img"/>Profile</MenuItem>
            <MenuItem onClick={handleClose} className="profile-menu-item"><img src={LogoutIcon} className="profile-menu-item__img"/>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
}

// <ul>
//     <li> <NavLink to="/" className={({isActive}) => isActive? 'active' : ''} end>Home</NavLink></li>
//     <li> <NavLink to="/login" className={({isActive}) => isActive? 'active' : ''}>Login</NavLink></li>
// </ul>

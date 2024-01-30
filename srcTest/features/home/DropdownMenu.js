// DropdownMenu.jsx
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Typography } from "@mui/material";

const DropdownMenu = ({ item, users, contents }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="cursor-pointer">
      <div onClick={handleClick}>{item}</div>
      <Menu
        className="absolute -left-10 top-8 w-full pr-20 "
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {users && (
          <MenuItem
            className="flex flex-col border pr-32 items-start mb-3"
            onClick={handleClose}
          >
            <div className="flex gap-2 items-center ">
              <Avatar />
              <div>
                <Typography variant="h6" className="font-bold">
                  {users?.first_name} {users?.last_name}
                </Typography>
                <Typography className="-mt-1">{users?.email}</Typography>
              </div>
            </div>
          </MenuItem>
        )}
        {contents.map((item) => (
          <MenuItem
            className="flex flex-col items-start mt-4 pr-32"
            onClick={handleClose}
          >
            <div className="flex gap-2 items-center">
              {item.icon}
              <div>
                <Typography variant="h6" className="font-bold">
                  {item.name}
                </Typography>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;

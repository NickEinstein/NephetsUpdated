import React from "react";
import ReactDOM from "react-dom";
import ArrowRight from "@mui/icons-material/ArrowRight";

import { Paper, Typography } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";
// import { Button, Card, Input, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';

import useAuthUser from "hooks/useAuthUser";

const NavLogoName = ({ color, name, icon, dropedown }) => {
  const authUser = useAuthUser();
  console.log(authUser);

  const navigate = useNavigate();

  const goBack = () => {
    console.log("Navigating back...");
    navigate(-1);
  };

  const history = useNavigate();

  return (
    <div
      className={`flex gap-1 items-center p-2 px-6 rounded-full ${
        color && "bg-black text-white"
      }`}
    >
      <img className="w-8" src={icon} />
      <Typography className="text-base">{name}</Typography>
      {/* {dropedown} */}
    </div>
  );
};
export default NavLogoName;

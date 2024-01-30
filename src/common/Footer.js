import React from "react";
import logo from "images/Nephets Assets/Nehpets Consulting Grey Outline 1.svg";
import logoTwitter from "images/Nephets Assets/logo-twitter.svg";
import logoInsta from "images/Nephets Assets/logo-instagram.svg";
import logoFacebook from "images/Nephets Assets/logo-facebook.svg";
import logoLinkedIn from "images/Nephets Assets/logo-linkedin.svg";
import { Avatar } from "antd";
import { Divider, Typography } from "@mui/material";
// import ReactDOM from 'react-dom';
// import { BsYoutube,BsFacebook,BsInstagram, BsApple, BsFillFileEarmarkCodeFill } from 'react-icons/bs';
// import { AiFillAndroid,AiOutlineCopyright, AiFillUnlock } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="grid grid-cols-12 px-[10%] bg-[#662817] text-white  py-[8%]">
      <div className="col-span-3">
        <img className="w-32" src={logo} />
      </div>
      <div className="col-span-9 grid grid-cols-4  justify-end">
        <div className="col-span-2"></div>
        <div className="flex flex-col gap-8 col-span-1">
            <Divider className="text-white bg-white w-1/4"/>
          <Typography className="text-base">Home</Typography>
          <Typography className="text-base">Coaching</Typography>
          <Typography className="text-base">Visa</Typography>
          <Typography className="text-base">About Us</Typography>
        </div>
        <div className="flex flex-col gap-8 col-span-1">
            <Divider className="text-white bg-white w-3/4"/>
          <Typography className="text-base">+234 (904) 919 5599</Typography>
          <Typography className="text-base">+1 (204) 441 - 4828</Typography>
          <Typography className="text-base">Info@Nehpets.consults</Typography>
          <div className="flex w-3/4 justify-between items-center">
            <img className="w-6" src={logoTwitter} />
            <img className="w-6" src={logoInsta} />
            <img className="w-6" src={logoFacebook} />
            <img className="w-6" src={logoLinkedIn} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;

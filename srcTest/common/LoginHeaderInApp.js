import React from "react";
import ReactDOM from "react-dom";
import ArrowRight from "@mui/icons-material/ArrowRight";

import { Paper, Typography } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";
// import { Button, Card, Input, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import logo from "images/aa/Frame 6853.svg";
import logo1 from "images/aa/app-bar-list-1.svg";
import logo2 from "images/aa/app-bar-list-2.svg";
import logo3 from "images/aa/app-bar-list-3.svg";
import logo4 from "images/aa/app-bar-list.svg";
import logo5 from "images/aa/avi.svg";
import logo6 from "images/aa/group.svg";
import logo7 from "images/aa/home.svg";
import logo8 from "images/aa/insert_chart.svg";
import logo9 from "images/aa/mainstack-logo.svg";
import logo10 from "images/aa/menu.svg";
import logo11 from "images/aa/payments.svg";
import logo12 from "images/aa/small tertiary button.svg";
import logo13 from "images/aa/widgets.svg";
import useAuthUser from "hooks/useAuthUser";
import NavLogoName from "features/home/NavLogoName";
import DropdownMenu from "features/home/DropdownMenu";
import UserApi from "apis/UserApi";
import {
  CardGiftcard,
  CardGiftcardOutlined,
  Inventory,
  Inventory2Outlined,
  InventoryOutlined,
  LogoutOutlined,
  Settings,
  SettingsOutlined,
  SwitchAccount,
  SwitchAccountOutlined,
  Widgets,
  WidgetsOutlined,
} from "@mui/icons-material";

const LoginHeader = (prop) => {
  const authUser = useAuthUser();
  console.log(authUser);

  const navigate = useNavigate();

  const goBack = () => {
    console.log("Navigating back...");
    navigate(-1);
  };

  const getUsersResult = UserApi.useGetUserQuery({});
  const users = getUsersResult?.data;

  const history = useNavigate();

  return (
    <Paper
      elevation={3}
      className=" w-full rounded-full border-t-0 flex justify-between gap-20 items-center  py-4 px-8 mb-2"
    >
      <img src={logo9} />

      <div className="flex gap-3">
        <NavLogoName name="Home" icon={logo7} />
        <NavLogoName name="Analytics" icon={logo8} />
        <NavLogoName color={true} name="Revenue" icon={logo11} />
        <NavLogoName name="CRM" icon={logo6} />

        <div className="flex gap-3">
          <DropdownMenu
            // users={users}
            item={
              <div className="flex gap-2 items-center cursor-pointer border-[#EFF1F6] p-1 rounded-full">
                <img className="w-10" src={logo13} />
                <Typography className="text-base">Apps</Typography>
              </div>
            }
            contents={[
              {
                name: "Link In Bio",
                icon: <img src={logo4} className="text-black" />,
              },
              {
                name: "Store",
                icon: <img src={logo1} className="text-black" />,
              },
              {
                name: "Media Kit",
                icon: <img src={logo2} className="text-black" />,
              },
              {
                name: "Invoicing",
                icon: <img src={logo3} className="text-black" />,
              },
              {
                name: "Bookings",
                icon: <img src={logo2} className="text-black" />,
              },
            ]}
          />

        </div>
     
      </div>

      <div className="flex gap-3">
        <img className="w-12" src={logo12} />
        <img className="w-12" src={logo} />
        <DropdownMenu
          users={users}
          item={
            <div className="flex gap-3 cursor-pointer bg-[#EFF1F6] border border-[#EFF1F6] p-1 rounded-full">
              <img className="w-10" src={logo5} />
              <img className="w-10 cursor-pointer" src={logo10} />
            </div>
          }
          contents={[
            {
              name: "Settings",
              icon: <SettingsOutlined className="text-black" />,
            },
            {
              name: "Purchase History",
              icon: <InventoryOutlined className="text-black" />,
            },
            {
              name: "Refer & Earn",
              icon: <CardGiftcardOutlined className="text-black" />,
            },
            {
              name: "Integrations",
              icon: <WidgetsOutlined className="text-black" />,
            },
            {
              name: "Report Bug",
              icon: <SwitchAccountOutlined className="text-black" />,
            },
            {
              name: "Switch Account",
              icon: <LogoutOutlined className="text-black" />,
            },
          ]}
        />

        {/* <img src={logo13} /> */}
      </div>
    </Paper>
  );
};
export default LoginHeader;

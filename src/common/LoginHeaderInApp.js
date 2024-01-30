import React from "react";
import ReactDOM from "react-dom";
import ArrowRight from "@mui/icons-material/ArrowRight";

import {
  Button,
  Input,
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

// import WarehouseSVGImage from "images/DashboardHeaderNavsImages/Warehouse.svg";

import { Dropdown, DropdownMenuItem, DropdownNestedMenuItem } from "./Dropdown";
// import LoginHeaderNavComponent from "./LoginHeaderNavComponent";

// import trustedBy1 from './images/Vector.png'
import toDoorLogo from "images/ManilosLogo2.svg";
import backSVG from "images/dashboardBody/arrow-turn-backward-sharp.svg";
import profileSVG from "../images/DashboardHeaderNavsImages/user-circle.svg";
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import { useNavigate, Link } from "react-router-dom";
// import { Button, Card, Input, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import LoginHeaderNavComponent from "./LoginHeaderNavComponent";
import WarehouseSVGImage from "images/DashboardHeaderNavsImages/Warehouse.svg";
import InventorySVGImage from "images/DashboardHeaderNavsImages/Inventory.svg";
import DocumentationSVGImage from "images/DashboardHeaderNavsImages/Documentation.svg";
import ShipmentSVGImage from "images/DashboardHeaderNavsImages/Shipment.svg";
import SystemAdminSVGImage from "images/DashboardHeaderNavsImages/SystemAdmin.svg";
import DashboardSVGImage from "images/DashboardHeaderNavsImages/Dashboard.svg";
import { RouteEnum } from "constants/RouteConstants";
import useLogout from "hooks/useLogout";
import useAuthUser from "hooks/useAuthUser";

const LoginHeader = (prop) => {
  const authUser = useAuthUser();
  console.log(authUser);

  const { logout } = useLogout();
  const navigate = useNavigate();
  let array = [
    {
      name: (
        <LoginHeaderNavComponent
          image={WarehouseSVGImage}
          text1="Warehouse"
          text2="Management"
        />
      ),
      children: [
        {
          name: "Stock Management",
          link: "",
          children: [
            { name: "Stock Intake", link: RouteEnum.STOCK_INTAKE },
            { name: "BDU Intake", link: RouteEnum.BDU_INTAKE },
            
            { name: "Stock Deliveries", link: RouteEnum.STOCK_DELIVERIES },
            // {
            //   // name: "Stock Labelling & Tagging",
            //   link: RouteEnum.STOCK_TAGGING,
            // },
            // { name: "Pending Stock", link: RouteEnum.PENDING_STOCK },
            { name: "Stock Returns", link: RouteEnum.STOCK_RETURN },
            { name: "Returning Intake", link: RouteEnum.STOCK_INTAKE_RETURN },

          ],
        },
        {
          name: "Stock Release",
          link: "",
          children: [
            { name: "Material Issuance", link: RouteEnum.STOCK_OUTBOUNDS },
            // { name: "Partial Issuance", link: "" },
            // { name: "Split Issuance", link: "" },
            {
              name: "Material Acceptance",
              link: RouteEnum.MATERIAL_ACCEPTANCE,
            },
            {
              name: "Issuance Cancelation",
              link: RouteEnum.ISSUANCE__CANCELLATION,
            },
          ],
        },
        {
          name: "Alarm",
          link: "",
          children: [
            // { name: "Illegal Movement Chart", link: RouteEnum.ILLEGAL_MOVEMENT_CHART },
            { name: "Switch Alarm Off", link: "" },
          ],
        },

        {
          name: "Requisition",
          link: RouteEnum.STOCK_REQUISITION,
          // children: [
          //   { name: "Illegal Movement Chart", link: "" },
          //   { name: "Switch Alarm Off", link: "" },
          // ],
        },
      ],
    },
    {
      name: (
        <LoginHeaderNavComponent
          image={InventorySVGImage}
          text1="Inventory"
          text2="Management"
        />
      ),
      children: [
        {
          name: "Item Management",
          link: "",
          children: [
            { name: "Item Creation", link: RouteEnum.ITEM_CREATION },
            { name: "Category Creation", link: "" },
            { name: "Item Parameter Management", link: "" },
            { name: "Upload Items", link: "" },
          ],
        },
        {
          name: "Stock Taking",
          link: "",
          children: [
            { name: "Spot Inventory Management", link: "" },
            { name: "Cycle Inventory Count", link: "" },
            // { name: "Split Issueance", link: "" },
            // {
            //   name: "Material Acceptance",
            //   link: RouteEnum.MATERIAL_ACCEPTANCE,
            // },
          ],
        },
        {
          name: "Inventories",
          link: "",
          children: [
            { name: "Balance Adjustment", link: "" },
            { name: "Inventory Transfer (Within Store Location)", link: "" },
            { name: "Inventory Transfer (Between Store Location)", link: "" },
          ],
        },
      ],
    },
    {
      name: (
        <LoginHeaderNavComponent
          image={ShipmentSVGImage}
          text1="Shipment"
          text2="Management"
        />
      ),
      children: [
        {
          name: "Bills Of Landing",
          link: "",
          children: [
            { name: "B/L Creation", link: "" },
            { name: "Label Printing", link: "" },
          ],
        },
        {
          name: "Smart Locks",
          link: "",
          children: [
            { name: "Generate Lock Codes", link: "" },
            { name: "Decode Lock Codes", link: "" },
          ],
        },
      ],
    },
    {
      name: (
        <LoginHeaderNavComponent
          image={SystemAdminSVGImage}
          text1="System"
          text2="Admin"
        />
      ),
      children: [
        {
          name: "User & Rights",
          link: "",
          children: [
            // { name: "User Creation", link: RouteEnum.USER_CREATION },
            // { name: "User Management", link: RouteEnum.USER_MANAGEMENT },
            { name: "Menu Management", link: "" },
            { name: "Role Management", link: "" },
            { name: "Manage User Groups", link: "" },
            { name: "Pending Profile Updates", link: "" },
            { name: "Resend", link: "" },
          ],
        },
        {
          name: "System Settings",
          link: "",
          children: [
            { name: "Link Product to Rack", link: RouteEnum.PRODUCT_RACK },
            { name: "Rack Management", link: RouteEnum.RACKS },
            // { name: "Role Management", link: "" },
          ],
        },
        {
          name: "General Admin",
          link: "",
          // children: [{ name: "", link: "" }],
        },
      ],
    },
    {
      name: (
        <LoginHeaderNavComponent
          image={DashboardSVGImage}
          text1="Dashboard "
          text2="Reports"
        />
      ),
      children: [
        {
          name: "Inventory Reports",
          link: "",
          children: [
            // { name: "Scanned Stocks", link: "" },
            { name: "Store Stock Items", link: "#" },
            { name: "Global Stock Items", link: "#" },
            { name: "Global Bin Card", link: RouteEnum.GLOBAL_BIN },
            { name: "Bin Card", link: RouteEnum.BIN_CARD },
            { name: "Product Statistics", link: "#" },
            { name: "Stock Balance by SKU", link: RouteEnum.STOCK_BALANCE_SKU },
            {
              name: "Stock Balance by Location",
              link: RouteEnum.STOCK_BALANCE_BY_LOCATION,
            },
            {
              name: "Stock Balance by Rack",
              link: RouteEnum.STOCK_BALANCE_RACK,
            },
            { name: "Purchase Reports", link: "#" },
            { name: "Re-Order Level ", link: RouteEnum.PRODUCT_BALANCE },
            { name: "Status Report", link: "#" },
            { name: "Minimum Balance Report", link: "#" },
            // { name: "Stock Deliveries", link: "" },
            // { name: "Stock Labelling & Tagging", link: "" },
            // { name: "Pending Stock", link: "" },
            // { name: "Stock Returns", link: "" },
          ],
        },
        {
          name: "Logs",
          link: "",
          children: [
            { name: "Audit Logs", link: RouteEnum.AUDIT_LOGS },
            { name: "Transaction Logs", link: RouteEnum.TRANSACTION_LOGS },
            { name: "Receiving Log - Store", link: RouteEnum.RECEIVING_LOG },
            // { name: "Receiving Log - Rack", link: "#" },
          ],
        },
        {
          name: "General Reports",
          link: "",
          children: [
            // { name: "Unauthorized Movement Reports", link: "#" },
            { name: "Item Release Reports", link: "#" },
            { name: "Print Items Released", link: "#" },
            { name: "Search Requests Released", link: "#" },
            { name: "Requisition Report", link: "#" },
            { name: "Delivery Report", link: RouteEnum.DELIVERY_REPORT },
            { name: "Shipment Status", link: "#" },
          ],
        },
      ],
    },
    {
      name: (
        <LoginHeaderNavComponent
          image={DocumentationSVGImage}
          text1="Documentation"
          text2="Support"
        />
      ),
      children: [
        {
          name: "Support Module",
          link: "",
          children: [
            { name: "Raise Support Ticket", link: "" },
            { name: "Support Ticket Status", link: "" },
            // { name: "Stock Labelling & Tagging", link: "" },
            // { name: "Pending Stock", link: "" },
            // { name: "Stock Returns", link: "" },
          ],
        },
        {
          name: "Documentation",
          link: "",
          children: [{ name: "", link: "" }],
        },
      ],
    },
  ];
  const goBack = () => {
    console.log("Navigating back...");
    navigate(-1);
  };

  const history = useNavigate();
  const redirect = () => {
    //   localStorage.setItem('auth', null)
    history("/");
  };
  return (
    <Paper className=" w-full flex justify-between gap-20 items-center  py-4 px-8 mb-2">
      <div className=" flex justify-between items-center gap-1 ">
        <div onClick={goBack} className="cursor-pointer w-6 mr-10">
          <img oncli src={backSVG} alt="Manilos Logo" />
        </div>
        <Link to={RouteEnum.DASHBOARD}>
          <div className=" flex justify-center items-center gap-1  col-span-2">
            <img
              src={toDoorLogo}
              alt="Manilos Logo"
              className="cursor-pointer w-8"
              onClick={redirect}
            />
            <Typography>MANILOS</Typography>
          </div>
        </Link>

        {/* <div onClick={goBack} className="cursor-pointer w-6 mr-10">
          <img oncli src={backSVG} alt="Manilos Logo"  />
        </div> */}
      </div>
      {/* <div class="flex- border"></div> */}
      <div className="w-full ">
        <Box class="flex gap-16 ">
          {array?.map((item) =>
            item?.children?.length ? (
              <Dropdown
                trigger={<div className="bg-white">{item?.name}</div>}
                menu={
                  item?.children.map((nestedItem) =>
                    nestedItem?.children?.length ? (
                      <DropdownNestedMenuItem
                        label={nestedItem?.name}
                        rightIcon={<ArrowRight />}
                        menu={
                          nestedItem?.children && [
                            ...nestedItem?.children.map((thirdStep) => (
                              <DropdownMenuItem
                                onClick={() => {
                                  console.log(thirdStep.link);
                                  history(thirdStep.link);
                                }}
                              >
                                {thirdStep?.name}
                              </DropdownMenuItem>
                            )),

                            // <DropdownMenuItem>
                            //   <Button
                            //     component="label"
                            //     sx={{
                            //       color: "#000",
                            //       textTransform: "none",
                            //       fontSize: "1rem",
                            //     }}
                            //     variant="text"
                            //   >
                            //     From Markdown file
                            //     <input
                            //       id="mdInput"
                            //       type="file"
                            //       accept={`.md`}
                            //       hidden
                            //       onChange={(e) => {}}
                            //     />
                            //   </Button>
                            // </DropdownMenuItem>,
                            // <DropdownMenuItem>
                            //   <Button
                            //     component="label"
                            //     sx={{
                            //       color: "#000",
                            //       textTransform: "none",
                            //       fontSize: "1rem",
                            //     }}
                            //     variant="text"
                            //   >
                            //     From HTML file
                            //     <input
                            //       id="mdInput"
                            //       type="file"
                            //       accept={`.html`}
                            //       hidden
                            //       onChange={(e) => {}}
                            //     />
                            //   </Button>
                            // </DropdownMenuItem>,
                          ]
                        }
                      />
                    ) : (
                      <DropdownMenuItem
                        onClick={() => {
                          history(nestedItem.link);
                        }}
                      >
                        {nestedItem?.name}
                      </DropdownMenuItem>
                    )
                  )
                  //   [

                  //   <DropdownNestedMenuItem
                  //     label="Save as"
                  //     rightIcon={<ArrowRight />}
                  //     menu={[
                  //       <DropdownMenuItem
                  //         onClick={() => {
                  //           console.log("clicked");
                  //         }}
                  //       >
                  //         Markdown
                  //       </DropdownMenuItem>,
                  //       <DropdownMenuItem
                  //         onClick={() => {
                  //           console.log("clicked");
                  //         }}
                  //       >
                  //         Plain HTML
                  //       </DropdownMenuItem>,
                  //       <DropdownMenuItem
                  //         onClick={() => {
                  //           console.log("clicked");
                  //         }}
                  //       >
                  //         Styled HTML
                  //       </DropdownMenuItem>,
                  //     ]}
                  //   />,

                  //   <DropdownNestedMenuItem
                  //     label="Export"
                  //     rightIcon={<ArrowRight />}
                  //     menu={[
                  //       <DropdownMenuItem
                  //         onClick={() => {
                  //           console.log("clicked");
                  //         }}
                  //       >
                  //         PDF
                  //       </DropdownMenuItem>,
                  //       <DropdownMenuItem
                  //         onClick={() => {
                  //           console.log("clicked");
                  //         }}
                  //       >
                  //         Github Gist
                  //       </DropdownMenuItem>,
                  //     ]}
                  //   />,
                  // ]
                }
              />
            ) : (
              <Dropdown
                trigger={<Button>View</Button>}
                menu={[
                  <DropdownMenuItem
                    onClick={() => {
                      console.log("clicked");
                    }}
                  >
                    {"Show preview"}
                  </DropdownMenuItem>,
                  <DropdownMenuItem
                    onClick={() => {
                      console.log("clicked");
                    }}
                  >
                    {"Show status bar"}
                  </DropdownMenuItem>,
                ]}
              />
            )
          )}

          {/*  <Dropdown
          trigger={<Button>Insert</Button>}
          menu={[
            <DropdownNestedMenuItem
              label="Image"
              rightIcon={<ArrowRight />}
              menu={[
                <DropdownMenuItem>
                  <Button
                    variant="text"
                    component="label"
                    sx={{
                      color: "#000",
                      textTransform: "none",
                      fontSize: "1rem"
                    }}
                  >
                    Upload from Computer
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/png, image/jpeg"
                      hidden
                      onChange={() => {}}
                    />
                  </Button>
                </DropdownMenuItem>,
                <DropdownMenuItem
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  From URL
                </DropdownMenuItem>
              ]}
            />,
            <DropdownNestedMenuItem
              label="CSV"
              rightIcon={<ArrowRight />}
              menu={[
                <DropdownNestedMenuItem
                  label="As Table"
                  rightIcon={<ArrowRight />}
                  menu={[
                    <DropdownMenuItem>
                      <Button
                        variant="text"
                        component="label"
                        sx={{
                          color: "#000",
                          textTransform: "none",
                          fontSize: "1rem"
                        }}
                      >
                        Upload from Computer
                        <input
                          id="csvInput"
                          type="file"
                          accept={`.csv`}
                          hidden
                          onChange={(e) => {}}
                        />
                      </Button>
                    </DropdownMenuItem>,
                    <DropdownMenuItem
                      onClick={() => {
                        console.log("clicked");
                      }}
                    >
                      From URL
                    </DropdownMenuItem>
                  ]}
                />
              ]}
            />
          ]}
        />
        <Dropdown
          trigger={<Button>Tools</Button>}
          menu={[
            <DropdownNestedMenuItem
              label="Headings"
              rightIcon={<ArrowRight />}
              menu={[
                <DropdownMenuItem
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  Convert to Titlecase
                </DropdownMenuItem>,
                <DropdownMenuItem
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  Generate Table of Contents
                </DropdownMenuItem>
              ]}
            />,
            <DropdownNestedMenuItem
              label="Code snippets"
              rightIcon={<ArrowRight />}
              menu={[
                <DropdownMenuItem
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  Guess languages
                </DropdownMenuItem>,
                <DropdownMenuItem onClick={() => {}}>
                  Prettify
                </DropdownMenuItem>,
                <DropdownMenuItem
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  Convert to Github Gists
                </DropdownMenuItem>,
                <DropdownMenuItem onClick={() => {}}>
                  Screenshots
                </DropdownMenuItem>
              ]}
            />
          ]}
        />
        <Dropdown
          trigger={<Button>More</Button>}
          menu={[
            <DropdownMenuItem onClick={() => {}}>Settings</DropdownMenuItem>,
            <DropdownMenuItem onClick={() => {}}>
              <Link
                underline="none"
                href="https://www.markdownguide.org/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Typography
                  style={{
                    color: "black"
                  }}
                >
                  Markdown Guide
                </Typography>
              </Link>
            </DropdownMenuItem>,
            <DropdownMenuItem onClick={() => {}}>
              <Link
                underline="none"
                href="https://forms.gle/6Mj24hef9mMAHfHN7"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Typography
                  style={{
                    color: "black"
                  }}
                >
                  Send Feedback
                </Typography>
              </Link>
            </DropdownMenuItem>
          ]}
        /> */}
        </Box>
      </div>
      <div className="cursor-pointer  mr-14">
        <Dropdown
          trigger={<img className="w-11" src={profileSVG} alt="profile Logo" />}
          menu={[
            <DropdownMenuItem
              onClick={() => {
                console.log("clicked");
              }}
            >
              <Typography className="font-bold">
                {authUser?.fullname}
              </Typography>
              <Typography className="font-bold">{authUser?.role}</Typography>
            </DropdownMenuItem>,
            <DropdownMenuItem
              onClick={() => {
                console.log("clicked");
              }}
            >
              {"View Profile"}
            </DropdownMenuItem>,
            <DropdownMenuItem
              onClick={() => {
                console.log("clicked");
              }}
            >
              {"Update Password"}
            </DropdownMenuItem>,
            <DropdownMenuItem
              onClick={() => {
                logout();
              }}
            >
              {"Sign Out"}
            </DropdownMenuItem>,
          ]}
        />
        {/* <img className="w-12" src={profileSVG} alt="Manilos Logo" /> */}
      </div>

      {/* <div class="col-span-8 flex gap-8">
                <div className=' col-span-2'>
                    <LoginHeaderNavComponent image={WarehouseSVGImage} text1='Warehouse' text2='Management'/>
                </div>
                <div className=' col-span-2'>
                    <LoginHeaderNavComponent image={InventorySVGImage} text1='Inventory' text2='Management'/>
                </div>
                <div className=' col-span-2'>
                    <LoginHeaderNavComponent image={ShipmentSVGImage} text1='Shipment' text2='Management'/>
                </div>
                <div className=' col-span-2'>
                    <LoginHeaderNavComponent image={SystemAdminSVGImage} text1='System' text2='Admin'/>
                </div>
                <div className=' col-span-2'>
                    <LoginHeaderNavComponent image={DashboardSVGImage} text1='Dashboards' text2='& Report'/>
                </div>
                <div className=' col-span-2'>
                    <LoginHeaderNavComponent image={DocumentationSVGImage} text1='Documentation' text2='& Support'/>
                </div>
            </div> */}
    </Paper>
  );
};
export default LoginHeader;

import React, { useEffect, useState } from "react";

import WarehouseSVGBox from "images/System Admin/ManilosUser&Rights-sub/1146501-200 1.svg";
import WarehouseSVGBox2 from "images/System Admin/ManilosUser&Rights-sub/1485884-200 1.svg";
import WarehouseSVGBox3 from "images/System Admin/ManilosUser&Rights-sub/2836348-200 1.svg";
import WarehouseSVGBox4 from "images/System Admin/ManilosUser&Rights-sub/4472042-200 1.svg";
import WarehouseSVGBox5 from "images/System Admin/ManilosUser&Rights-sub/noun-group-management-6131398 1.svg";
import WarehouseSVGBox6 from "images/System Admin/ManilosUser&Rights-sub/role-management-13 1.svg";
import WarehouseSVGInventoru from "images/Inventory Management/ManilosInventory-main/inventory-management 1.svg";

import DashboardCards from "common/DashboardCards";
import DashboardStatisticsCard from "common/DashboardStatisticCard";
import WatermarkSVGImage from "images/dashboardBody/watermark.svg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";

function InventoryManagement(props) {
  return (
    <div>
      <img
        className="absolute h-[89vh] w-[67%] right-0 bottom-0 items-center flex "
        src={WatermarkSVGImage}
      />

      <div className=" flex flex-col justify-center min-h-[80vh] items-center w-full">
        <Typography variant="h2" className="z-10 mb-12">
          User & Rights
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
        {/* <div class="col-span-4">
            <Link to={RouteEnum.USER_CREATION}>
              <DashboardCards
                image={WarehouseSVGBox3}
                text1="User Creation"
                text2="Manager"
                showText={false}
              />
            </Link>
          </div> */}
          <div class="col-span-4">
            <Link to={RouteEnum.USER_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox4}
                text1="User Management"
                text2="Manager"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox6}
                text1="Role Management"
                text2="Manager"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox5}
                text1="Manage User "
                text2="Groups"
                showText={false}
              />
            </Link>
          </div>
        
        
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox2}
                text1="Role Management"
                text2="Manager"
                showText={false}
              />
            </Link>
          </div>

          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox}
                text1="Resend"
                text2="Management"
                showText={true}
              />
            </Link>
          </div>
         
        
        </div>
      </div>
    </div>
  );
}

export default InventoryManagement;

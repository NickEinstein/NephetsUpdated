import React, { useEffect, useState } from "react";

import WarehouseSVGBox from "images/System Admin/ManilosSystemSetting-sub/1087111-200 1.svg";
import WarehouseSVGBox2 from "images/System Admin/ManilosSystemSetting-sub/3067451 1.svg";
import WarehouseSVGBox3 from "images/System Admin/ManilosSystemSetting-sub/google-location-icon-16 1.svg";
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
          System Settings
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox}
                text1="Emails & "
                text2="Notifications"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.LOCATION_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox3}
                text1="Locations"
                text2="Management"
                // showText={false}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox2}
                text1="Device Settings"
                text2=""
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

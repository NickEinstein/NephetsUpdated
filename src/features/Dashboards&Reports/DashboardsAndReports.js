import React, { useEffect, useState } from "react";

import WarehouseSVGBox from "images/Dashboard&Reports/ManilosDashboard&Reports-main/5759267 1.svg";
import WarehouseSVGBox2 from "images/Dashboard&Reports/ManilosDashboard&Reports-main/6735211 1.svg";
import WarehouseSVGBox3 from "images/Dashboard&Reports/ManilosDashboard&Reports-main/document 1.svg";

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
          Dashboard & Reports Management
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-4">
            <Link to={RouteEnum.INVENTORY_REPORTS}>
              <DashboardCards
                image={WarehouseSVGBox}
                text1="Inventory Reports"
                text2="Management"
                showText={true}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.LOGS}>
              <DashboardCards
                image={WarehouseSVGBox2}
                text1="Logs"
                text2="Manager"
                showText={true}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.GENERAL_REPORTS}>
              <DashboardCards
                image={WarehouseSVGBox3}
                text1="General"
                text2="Reports"
                showText={false}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryManagement;

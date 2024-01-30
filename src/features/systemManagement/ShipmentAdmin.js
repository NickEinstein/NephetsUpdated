import React, { useEffect, useState } from "react";

import WarehouseSVGBox from "images/System Admin/ManilosSystemAdmin-main/2522021 1.svg";
import WarehouseSVGBox2 from "images/System Admin/ManilosSystemAdmin-main/2606675-200 1.svg";
import WarehouseSVGBox3 from "images/System Admin/ManilosSystemAdmin-main/user-admin-icon-2023x2048-3apoo4ql 1.svg";

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
          System Admin
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-4">
            <Link to={RouteEnum.USER_RIGHTS}>
              <DashboardCards
                image={WarehouseSVGBox}
                text1="Users & Rights"
                text2="Management"
                showText={true}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.SYSTEM_SETTINGS}>
              <DashboardCards
                image={WarehouseSVGBox2}
                text1="System Settings"
                text2="Manager"
                showText={true}
              />
            </Link>
          </div>

          <div class="col-span-4">
            <Link to={RouteEnum.GENERAL_ADMIN}>
              <DashboardCards
                image={WarehouseSVGBox3}
                text1="General Admin"
                text2="Manager"
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

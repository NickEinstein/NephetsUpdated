import React, { useEffect, useState } from "react";

import WarehouseSVGMaterialIssuance from "images/WarehouseManagement/ManilosAlarm-sub/1024px-Noun_Project_pie_chart_icon_1379121_cc 1.svg";
import WarehouseSVGPartialIssuance from "images/WarehouseManagement/ManilosAlarm-sub/power-button-icon-31-removebg-preview 1.svg";

import WarehouseSVGBox from "images/WarehouseManagement/ManilosWarehouse/box 1.svg";

import DashboardCards from "common/DashboardCards";
import DashboardStatisticsCard from "common/DashboardStatisticCard";
import WatermarkSVGImage from "images/dashboardBody/watermark.svg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";

function StoreManagement(props) {
  return (
    <div>
      <img
        className="absolute h-[89vh] w-[67%] right-0 bottom-0 items-center flex "
        src={WatermarkSVGImage}
      />

      <div className=" flex flex-col justify-center min-h-[80vh] items-center w-full">
        <Typography variant="h2" className="z-10 mb-12 font-bold">
          Alarm
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-6">
            <Link to={RouteEnum.ILLEGAL_MOVEMENT_CHART}>
              <DashboardCards
                image={WarehouseSVGMaterialIssuance}
                text1="Illegal Movement"
                text2="Chart"
              />
            </Link>
          </div>

          <div class="col-span-6">
            <Link to={RouteEnum.WAREHOUSE}>
              <DashboardCards
                image={WarehouseSVGPartialIssuance}
                text1="Switch Alarm"
                text2="Off"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreManagement;

import React, { useEffect, useState } from "react";

import WarehouseSVGAlarm from "images/WarehouseManagement/ManilosWarehouse/alarm 1.svg";
import WarehouseSVGBox from "images/WarehouseManagement/ManilosWarehouse/box 1.svg";
import WarehouseSVGWarehouse from "images/WarehouseManagement/ManilosWarehouse/warehouse 1.svg";
import WarehouseSVGRequisition from "images/WarehouseManagement/ManilosWarehouse/requisitions-1-removebg-preview 1.svg";

import DashboardCards from "common/DashboardCards";
import DashboardStatisticsCard from "common/DashboardStatisticCard";
import WatermarkSVGImage from "images/dashboardBody/watermark.svg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";

function WarehouseManagement(props) {
  return (
    <div>
      <img
        className="absolute h-[89vh] w-[67%] right-0 bottom-0 items-center flex "
        src={WatermarkSVGImage}
      />

      <div className=" flex flex-col justify-center min-h-[80vh] items-center w-full">
        <Typography variant="h2" className="z-10 mb-12 font-bold">
          Warehouse Management
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox}
                text1="Stock"
                text2="Management"
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_RELEASE}>
              <DashboardCards
                image={WarehouseSVGWarehouse}
                text1="Stock"
                text2="Release"
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.ALARM}>
              <DashboardCards
                image={WarehouseSVGAlarm}
                text1="Alarm"
                text2="bells"
                showText={true}
              />
            </Link>
          </div>

          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_REQUISITION}>
              <DashboardCards
                image={WarehouseSVGRequisition}
                text1="Requisition"
                text2="bells"
                makebig={true}
                showText={true}
              />
            </Link>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default WarehouseManagement;

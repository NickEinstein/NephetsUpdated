import React, { useEffect, useState } from "react";

import WarehouseSVGBox from "images/Inventory Management/ManilosInventory-main/box 1.svg";
import WarehouseSVGCrisis from "images/Inventory Management/ManilosInventory-main/crisis-management 1.svg";
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
          Inventory Management
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-4">
            <Link to={RouteEnum.ITEMS_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGCrisis}
                text1="Items"
                text2="Management"
                //   showText = {true}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_TAKING}>
              <DashboardCards
                image={WarehouseSVGBox}
                text1="Stock Taking"
                text2="Manager"
                showText={true}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.INVENTORIES}>
              <DashboardCards
                image={WarehouseSVGInventoru}
                text1="Inventories"
                text2="Release"
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

import React, { useEffect, useState } from "react";

import WarehouseSVG659724 from "images/Inventory Management/ManilosInventories-sub/659724-200 1.svg";
import WarehouseSVGInventory from "images/Inventory Management/ManilosInventories-sub/inventory-management 1.svg";
import WarehouseSVGStock from "images/Inventory Management/ManilosInventories-sub/stock 1.svg";

import DashboardCards from "common/DashboardCards";
import DashboardStatisticsCard from "common/DashboardStatisticCard";
import WatermarkSVGImage from "images/dashboardBody/watermark.svg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";

function Inventories(props) {
  return (
    <div>
      <img
        className="absolute h-[89vh] w-[67%] right-0 bottom-0 items-center flex "
        src={WatermarkSVGImage}
      />

      <div className=" flex flex-col justify-center min-h-[80vh] items-center w-full">
        <Typography variant="h2" className="z-10 mb-12">
          Inventories
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVG659724}
                text1="Balance"
                text2="Adjustment"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGInventory}
                text1="Inventory Transfer Within"
                text2="store Location"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGStock}
                text1="Inventory Transfer between"
                text2="Store Location"
                showText={false}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventories;

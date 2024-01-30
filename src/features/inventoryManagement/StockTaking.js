import React, { useEffect, useState } from "react";

import WarehouseSVGBox from "images/Inventory Management/ManilosStockTaking-sub/2370787-200 2.svg";
import WarehouseSVGCrisis from "images/Inventory Management/ManilosStockTaking-sub/5057-200 1.svg";
import WarehouseSVGInventoru from "images/Inventory Management/ManilosStockTaking-sub/6735211 1.svg";
import WarehouseSVGMaterialAcceptance from "images/Inventory Management/ManilosStockTaking-sub/download__6_-removebg-preview 1.svg";

import DashboardCards from "common/DashboardCards";
import DashboardStatisticsCard from "common/DashboardStatisticCard";
import WatermarkSVGImage from "images/dashboardBody/watermark.svg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";

function StockTaking(props) {
  return (
    <div>
      <img
        className="absolute h-[89vh] w-[67%] right-0 bottom-0 items-center flex "
        src={WatermarkSVGImage}
      />

      <div className=" flex flex-col justify-center min-h-[80vh] items-center w-full">
        <Typography variant="h2" className="z-10 mb-12">
          Stock Taking
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-6">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGInventoru}
                text1="Spot"
                text2="Inventory Count"
                showText={false}
              />
            </Link>
          </div>

          <div class="col-span-6">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox}
                text1="Cycle"
                text2="Inventory Count"
                showText={false}
              />
            </Link>
          </div>
          {/* <div class="col-span-6">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGCrisis}
                text1="Split Issueance"
                text2="Management"
                showText={true}
              />
            </Link>
          </div> */}
          {/* <div class="col-span-6">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGMaterialAcceptance}
                text1="Material "
                text2="Acceptance"
                showText={false}
              />
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default StockTaking;

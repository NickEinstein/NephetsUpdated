import React, { useEffect, useState } from "react";

import WarehouseSVGStockIntake from "images/WarehouseManagement/ManilosStockManagement-sub/2370787-200 1.svg";
import WarehouseSVGStockDelivery from "images/WarehouseManagement/ManilosStockManagement-sub/5759267 1.svg";
import WarehouseSVGStockLabeling from "images/WarehouseManagement/ManilosStockManagement-sub/stock (1) 1.svg";
import WarehouseSVGPendingStocks from "images/WarehouseManagement/ManilosStockManagement-sub/delivery-time 1.svg";
import WarehouseSVGStockReturn from "images/WarehouseManagement/ManilosStockManagement-sub/stock 1.svg";

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
          Stock Management
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_INTAKE}>
              <DashboardCards
                image={WarehouseSVGStockReturn}
                text1="Stock Intake"
                text2="Intake"
                showText={true}
              />
            </Link>
          </div>

          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_DELIVERIES}>
              <DashboardCards
                image={WarehouseSVGStockDelivery}
                text1="Stock"
                text2="Deliveries"
              />
            </Link>
          </div>
          {/* <div class="col-span-4">
            <Link to={RouteEnum.STOCK_TAGGING}>
              <DashboardCards
                image={WarehouseSVGStockLabeling}
                text1="Stock Labelling"
                text2="& Tagging"
              />
            </Link>
          </div> */}
          <div class="col-span-4">
            <Link to={RouteEnum.PENDING_STOCK}>
              <DashboardCards
                image={WarehouseSVGPendingStocks}
                text1="Pending Stock"
                text2="Stock"
                showText={true}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_RETURN}>
              <DashboardCards
                image={WarehouseSVGStockIntake}
                text1="Stock Returns"
                text2="Returns"
                showText={true}
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.STOCK_INTAKE_RETURN}>
              <DashboardCards
                image={WarehouseSVGStockIntake}
                text1="BDU Intake"
                text2="Returns"
                showText={true}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreManagement;

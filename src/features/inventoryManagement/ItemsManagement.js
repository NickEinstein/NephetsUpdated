import React, { useEffect, useState } from "react";

import WarehouseSVGItemCreation from "images/Inventory Management/ManilosItemsManagement-sub/3875754 1.svg";
import WarehouseSVGCategoryCreation from "images/Inventory Management/ManilosItemsManagement-sub/4994463 1.svg";
import WarehouseParameterManagement from "images/Inventory Management/ManilosItemsManagement-sub/659724-200 1.svg";
import WarehouseSVGItemUpload from "images/Inventory Management/ManilosItemsManagement-sub/Pngtreefile upload icon_4717174 1.svg";

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
          Items Management
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-6">
            <Link to={RouteEnum.ITEM_CREATION}>
              <DashboardCards
                image={WarehouseSVGCategoryCreation}
                text1="Items Creation"
                text2="Creation"
                showText={true}
              />
            </Link>
          </div>
          <div class="col-span-6">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGItemCreation}
                text1="Category "
                text2="Creation"
                showText={false}
              />
            </Link>
          </div>

          <div class="col-span-6">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseParameterManagement}
                text1="Parameter"
                text2="Management"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-6">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGItemUpload}
                text1="Item Upload"
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

import React, { useEffect, useState } from "react";

import WarehouseSVGMaterialIssuance from "images/WarehouseManagement/ManilosStockRelease-sub/5057-200 1.svg";
import WarehouseSVGPartialIssuance from "images/WarehouseManagement/ManilosStockRelease-sub/download__6_-removebg-preview 1.svg";
import WarehouseSVGSplitIssuance from "images/WarehouseManagement/ManilosStockRelease-sub/eclipse 1.svg";
import WarehouseSVGMaterialAcceptance from "images/WarehouseManagement/ManilosStockRelease-sub/issue-doc-approval 1.svg";
import WarehouseSVGIssuanceCancellation from "images/WarehouseManagement/ManilosStockRelease-sub/istockphoto-1151657492-612x612-removebg-preview 1.svg";

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
          Stock Release
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-4">
            <Link to={RouteEnum.MATERIAL_ISSUANCE}>
              <DashboardCards
                image={WarehouseSVGMaterialAcceptance}
                text1="Material"
                text2="Issuance"
              />
            </Link>
          </div>
          {/* <div class="col-span-4">
            <Link to={RouteEnum.PARTIAL_ISSUANCE}>
              <DashboardCards
                image={WarehouseSVGSplitIssuance}
                text1="Partial"
                text2="Issuance"
              />
            </Link>
          </div> */}

          {/* <div class="col-span-4">
            <Link to={RouteEnum.WAREHOUSE}>
              <DashboardCards
                image={WarehouseSVGMaterialIssuance}
                text1="Split"
                text2="Issuance"
              />
            </Link>
          </div> */}

          <div class="col-span-4">
            <Link to={RouteEnum.MATERIAL_ACCEPTANCE}>
              <DashboardCards
                image={WarehouseSVGPartialIssuance}
                text1="Material"
                text2="Acceptance"
              />
            </Link>
          </div>

          <div class="col-span-4">
            <Link to={RouteEnum.ISSUANCE__CANCELLATION}>
              <DashboardCards
                image={WarehouseSVGIssuanceCancellation}
                text1="Issuance"
                text2="Cancellation"
                //   showText = {true}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreManagement;

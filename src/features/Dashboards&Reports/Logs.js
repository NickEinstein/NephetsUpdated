import React, { useEffect, useState } from "react";

import WarehouseSVGBox from "images/Dashboard&Reports/ManilosLogs-sub/3773184 3.svg";
import WarehouseSVGBox2 from "images/Dashboard&Reports/ManilosLogs-sub/4954465-200 1.svg";
import WarehouseSVGBox3 from "images/Dashboard&Reports/ManilosLogs-sub/9409809 1.svg";
import WarehouseSVGBox4 from "images/Dashboard&Reports/ManilosLogs-sub/stock 1.svg";

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
          Logs
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-6">
            <Link to={RouteEnum.AUDIT_LOGS}>
              <DashboardCards
                image={WarehouseSVGBox}
                text1="Audit Logs"
                text2="Management"
                showText={true}
              />
            </Link>
          </div>
          <div class="col-span-6">
            <Link to={RouteEnum.TRANSACTION_LOGS}>
              <DashboardCards
                image={WarehouseSVGBox2}
                text1="Transaction"
                text2="Logs"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-6">
            <Link to={RouteEnum.RECEIVING_LOG}>
              <DashboardCards
                image={WarehouseSVGBox3}
                text1="Receiving Log"
                text2="Store"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-6">
            <Link to={RouteEnum.RELEASE_LOG}>
              <DashboardCards
                image={WarehouseSVGBox4}
                text1="Release Log"
                text2="Rack"
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

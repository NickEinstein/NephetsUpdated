import React, { useEffect, useState } from "react";

import WarehouseSVGBox from "images/Dashboard&Reports/ManilosGeneralReports-sub/3022251 1.svg";
import WarehouseSVGBox2 from "images/Dashboard&Reports/ManilosGeneralReports-sub/3817984-200 1.svg";
import WarehouseSVGBox3 from "images/Dashboard&Reports/ManilosGeneralReports-sub/4426996-200 1.svg";
import WarehouseSVGBox4 from "images/Dashboard&Reports/ManilosGeneralReports-sub/5280981-200 1.svg";
import WarehouseSVGBox5 from "images/Dashboard&Reports/ManilosGeneralReports-sub/60495 1.svg";
import WarehouseSVGBox6 from "images/Dashboard&Reports/ManilosGeneralReports-sub/6734914 1.svg";
import WarehouseSVGBox7 from "images/Dashboard&Reports/ManilosGeneralReports-sub/document 1.svg";

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
          General Report
        </Typography>
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          {/* <div class="col-span-3">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox}
                text1="Unauthorized"
                text2="Movement Report"
                showText={false}
              />
            </Link>
          </div> */}
          <div class="col-span-3">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox2}
                text1="Items Release"
                text2="Report"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox3}
                text1="Print Items "
                text2="Released"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox4}
                text1="Search Items"
                text2="Released"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox5}
                text1="Requisition"
                text2="Report"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={RouteEnum.DELIVERY_REPORT}>
              <DashboardCards
                image={WarehouseSVGBox6}
                text1="Delivery Report"
                text2="Delivery"
                showText={true}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox7}
                text1="Shipment"
                text2="status"
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

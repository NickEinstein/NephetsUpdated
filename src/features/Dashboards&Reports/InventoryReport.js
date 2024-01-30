import React, { useEffect, useState } from "react";

import WarehouseSVGBox from "images/Dashboard&Reports/ManilosInventoryReports-sub/1200px-Globe_icon 1.svg";
import WarehouseSVGBox2 from "images/Dashboard&Reports/ManilosInventoryReports-sub/3773184 3.svg";
import WarehouseSVGBox3 from "images/Dashboard&Reports/ManilosInventoryReports-sub/4778417 1.svg";
import WarehouseSVGBox4 from "images/Dashboard&Reports/ManilosInventoryReports-sub/5428802-200 1.svg";
import WarehouseSVGBox5 from "images/Dashboard&Reports/ManilosInventoryReports-sub/Group 21.svg";
import WarehouseSVGBox6 from "images/Dashboard&Reports/ManilosInventoryReports-sub/Scanned labels icon.svg";
import WarehouseSVGBox7 from "images/Dashboard&Reports/ManilosInventoryReports-sub/google-location-icon-16 1.svg";
import WarehouseSVGBox8 from "images/Dashboard&Reports/ManilosInventoryReports-sub/maintaining-minimum-required-account-balance-line-icon-illustration-vector-removebg-preview 1.svg";
import WarehouseSVGBox9 from "images/Dashboard&Reports/ManilosInventoryReports-sub/pngtree-bin-file-format-icon-design-for-your-project-png-image_1040558-removebg-preview 1.svg";
import WarehouseSVGBox10 from "images/Dashboard&Reports/ManilosInventoryReports-sub/reorder-icon-18 1.svg";
import WarehouseSVGBox11 from "images/Dashboard&Reports/ManilosInventoryReports-sub/sku-description-line-icon-vector-removebg-preview 1.svg";
import WarehouseSVGBox12 from "images/Dashboard&Reports/ManilosInventoryReports-sub/stock 1.svg";

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
        {/* <Typography variant="h2" className="z-10 mb-12">
          Inventory Report
        </Typography> */}
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          {/* <div class="col-span-3">
            <Link to={RouteEnum.STOCK_MANAGEMENT}>
              <DashboardCards
                image={WarehouseSVGBox11}
                text1="Scanned "
                text2="Labels"
                showText={false}
              />
            </Link>
          </div> */}
          {/* <div class="col-span-3">
            <Link to={'#'}>
              <DashboardCards
                image={WarehouseSVGBox12}
                text1="Scanned"
                text2="Stocks"
                showText={false}
              />
            </Link>
          </div> */}
         
          <div class="col-span-3">
            <Link to={'#'}>
              <DashboardCards
                image={WarehouseSVGBox}
                text1="Store Stock"
                text2="Items"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={'#'}>
              <DashboardCards
                image={WarehouseSVGBox2}
                text1="Global Stock"
                text2="Items"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={RouteEnum.GLOBAL_BIN}>
              <DashboardCards
                image={WarehouseSVGBox3}
                text1="Global Bin"
                text2="Cards"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={RouteEnum.GLOBAL_BIN}>
              <DashboardCards
                image={WarehouseSVGBox3}
                text1="Bin Card"
                text2="Cards"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={'#'}>
              <DashboardCards
                image={WarehouseSVGBox4}
                text1="Product"
                text2="Statistic"
                showText={false}
              />
            </Link>
          </div>
          
          <div class="col-span-3">
            <Link to={RouteEnum.STOCK_BALANCE_SKU}>
              <DashboardCards
                image={WarehouseSVGBox6}
                text1="Stock Balance"
                text2="by SKU"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={RouteEnum.STOCK_BALANCE_BY_LOCATION}>
              <DashboardCards
                image={WarehouseSVGBox7}
                text1="Stock Balance"
                text2="By Location"
                showText={false}
              />
            </Link>
          </div>
        
          <div class="col-span-3">
            <Link to={RouteEnum.STOCK_BALANCE_RACK}>
              <DashboardCards
                image={WarehouseSVGBox9}
                text1="Stock Balance"
                text2="By Rack"
                showText={false}
              />
            </Link>
          </div>
         
          <div class="col-span-3">
            <Link to={'#'}>
              <DashboardCards
                image={WarehouseSVGBox8}
                text1="Purchase"
                text2="Report"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={RouteEnum.PRODUCT_BALANCE}>
              <DashboardCards
                image={WarehouseSVGBox5}
                text1="Reorder Level"
                text2="Status Report"
                showText={false}
              />
            </Link>
          </div>
          <div class="col-span-3">
            <Link to={'#'}>
              <DashboardCards
                image={WarehouseSVGBox10}
                text1="Minimum Balance"
                text2="Report"
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

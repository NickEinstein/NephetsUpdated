import { lazy } from "react";
import { Container, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { Navigate, useRoutes } from "react-router-dom";
import Suspense from "common/Suspense";
import { configureRoutes } from "utils/RouteUtils";
import { RouteEnum } from "constants/RouteConstants";
import Box from "@mui/material/Box";
import SideBar from "features/sideBar/SideBar";
import useAuthUser from "hooks/useAuthUser";

import LoginHeader from "common/LoginHeaderInApp";
import useLogout from "hooks/useLogout";
import LocationApi from "apis/LocationApi";

function AppProtected(props) {
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const routes = useRoutes(ROUTES);

  return (
    <>
      <Container maxWidth="xl">
      {
        <div className="flex flex-col ">
          <LoginHeader />
        </div>
      }

      </Container>
    </>
  );
}

export default AppProtected;

const ROUTES = configureRoutes([
  {
    path: "*",
    // element: lazy(() => import("features/home/Home")),

    element: <Navigate to={RouteEnum.HOME} replace />,
  },
  // {
  //   path: RouteEnum.HOME,
  //   element: lazy(() => import("features/home/Home")),
  // },
  {
    path: RouteEnum.ABOUT_US,
    element: lazy(() => import("features/aboutUs/AboutUs")),
  },
  // {
  //   path: RouteEnum.WAREHOUSE,
  //   element: lazy(() =>
  //     import("features/warehouseManagement/WarehouseManagement")
  //   ),
  // },
  // {
  //   path: RouteEnum.STOCK_MANAGEMENT,
  //   element: lazy(() => import("features/warehouseManagement/StockManagement")),
  // },
  // {
  //   path: RouteEnum.STOCK_RELEASE,
  //   element: lazy(() => import("features/warehouseManagement/StockRelease")),
  // },
  // {
  //   path: RouteEnum.ALARM,
  //   element: lazy(() => import("features/warehouseManagement/Alarm")),
  // },
  // {
  //   path: RouteEnum.INVENTORY,
  //   element: lazy(() =>
  //     import("features/inventoryManagement/InventoryManagement")
  //   ),
  // },
  // {
  //   path: RouteEnum.ITEMS_MANAGEMENT,
  //   element: lazy(() => import("features/inventoryManagement/ItemsManagement")),
  // },
  // {
  //   path: RouteEnum.STOCK_TAKING,
  //   element: lazy(() => import("features/inventoryManagement/StockTaking")),
  // },

  // {
  //   path: RouteEnum.INVENTORIES,
  //   element: lazy(() => import("features/inventoryManagement/Inventories")),
  // },

  // {
  //   path: RouteEnum.SHIPMENT,
  //   element: lazy(() =>
  //     import("features/shipmentManagement/ShipmentManagement")
  //   ),
  // },
  // {
  //   path: RouteEnum.SYSTEM_ADMIN,
  //   element: lazy(() => import("features/systemManagement/ShipmentAdmin")),
  // },
  // {
  //   path: RouteEnum.USER_RIGHTS,
  //   element: lazy(() => import("features/systemManagement/UserRights")),
  // },
  // {
  //   path: RouteEnum.SYSTEM_SETTINGS,
  //   element: lazy(() => import("features/systemManagement/SystemSettings")),
  // },

  // {
  //   path: RouteEnum.GENERAL_ADMIN,
  //   element: lazy(() => import("features/systemManagement/GeneralAdmin")),
  // },

  // {
  //   path: RouteEnum.DASHBOARD_REPORTS,
  //   element: lazy(() =>
  //     import("features/Dashboards&Reports/DashboardsAndReports")
  //   ),
  // },
  // {
  //   path: RouteEnum.GENERAL_REPORTS,
  //   element: lazy(() => import("features/Dashboards&Reports/GeneralReports")),
  // },
  // {
  //   path: RouteEnum.INVENTORY_REPORTS,
  //   element: lazy(() => import("features/Dashboards&Reports/InventoryReport")),
  // },
  // {
  //   path: RouteEnum.LOGS,
  //   element: lazy(() => import("features/Dashboards&Reports/Logs")),
  // },
  // {
  //   path: RouteEnum.DOCUMENTATION_SUPPORT,
  //   element: lazy(() =>
  //     import("features/documentation&Support/DocumentationSupport")
  //   ),
  // },

  // {
  //   path: RouteEnum.STOCK_INTAKE,
  //   element: lazy(() => import("features/stock/StockIntake")),
  // },
  // {
  //   path: RouteEnum.BDU_INTAKE,
  //   element: lazy(() => import("features/stock/BDUIntake")),
  // },
  // {
  //   path: RouteEnum.STOCK_INTAKE_RETURN,
  //   element: lazy(() => import("features/stock/StockIntakeReturning")),
  // },
  // {
  //   path: RouteEnum.STOCK_DELIVERIES,
  //   element: lazy(() => import("features/stock/StockDeliveries")),
  // },

  // {
  //   path: RouteEnum.STOCK_TAGGING,
  //   element: lazy(() => import("features/stock/StockTagging")),
  // },
  // {
  //   path: RouteEnum.PENDING_STOCK,
  //   element: lazy(() => import("features/stock/PendingStock")),
  // },

  // {
  //   path: RouteEnum.STOCK_RETURN,
  //   element: lazy(() => import("features/stock/StockReturns")),
  // },

  // // {
  // //   path: RouteEnum.MATERIAL_ISSUANCE,
  // //   element: lazy(() => import("features/issue/MaterialIssueance")),
  // // },
  // {
  //   path: RouteEnum.PARTIAL_ISSUANCE,
  //   element: lazy(() => import("features/issue/PartialIssueance")),
  // },
  // // {
  // //   path: RouteEnum.MATERIAL_ACCEPTANCE,
  // //   element: lazy(() => import("features/issue/MaterialAcceptance")),
  // // },
  // {
  //   path: RouteEnum.ISSUANCE__CANCELLATION,
  //   element: lazy(() => import("features/issue/IssueCancellation")),
  // },
  // {
  //   path: RouteEnum.ILLEGAL_MOVEMENT_CHART,
  //   element: lazy(() => import("features/issue/IllegalMovement")),
  // },
  // {
  //   path: RouteEnum.ITEM_CREATION,
  //   element: lazy(() => import("features/itemCreation/ItemCreation")),
  // },
  // {
  //   path: RouteEnum.PARAMETER_MANAGEMENT,
  //   element: lazy(() => import("features/stock/StockReturns")),
  // },
  // {
  //   path: RouteEnum.SPOT_INVENTORY_COUNT,
  //   element: lazy(() => import("features/stock/StockReturns")),
  // },
  // {
  //   path: RouteEnum.RACKS,
  //   element: lazy(() => import("features/racks/Rack")),
  // },
  // {
  //   path: RouteEnum.INVENTORY_TRANSFERS,
  //   element: lazy(() => import("features/stock/StockReturns")),
  // },
  // {
  //   path: RouteEnum.USER_CREATION,
  //   element: lazy(() => import("features/user/UserCreation")),
  // },

  // {
  //   path: RouteEnum.USER_MANAGEMENT,
  //   element: lazy(() => import("features/user/UserManagement")),
  // },

  // {
  //   path: RouteEnum.GLOBAL_BIN,
  //   element: lazy(() => import("features/Dashboards&Reports/GlobalBin")),
  // },
  // {
  //   path: RouteEnum.BIN_CARD,
  //   element: lazy(() => import("features/Dashboards&Reports/BinCard")),
  // },
  // {
  //   path: RouteEnum.STOCK_BALANCE_SKU,
  //   element: lazy(() => import("features/stock/StockBalanceBySKU")),
  // },
  // {
  //   path: RouteEnum.STOCK_BALANCE_BY_LOCATION,
  //   element: lazy(() => import("features/stock/StockBalanceByLocation")),
  // },

  // {
  //   path: RouteEnum.PRODUCT_BALANCE,
  //   element: lazy(() => import("features/stock/ReorderLevelStatusReport")),
  // },
  // {
  //   path: RouteEnum.AUDIT_LOGS,
  //   element: lazy(() => import("features/stock/AuditLogs")),
  // },

  // {
  //   path: RouteEnum.TRANSACTION_LOGS,
  //   element: lazy(() => import("features/stock/TransactionLog")),
  // },
  // {
  //   path: RouteEnum.STOCK_BALANCE_RACK,
  //   element: lazy(() => import("features/stock/StockBalanceByRack")),
  // },
  // {
  //   path: RouteEnum.RECEIVING_LOG,
  //   element: lazy(() => import("features/stock/ReceivingLog")),
  // },
  // {
  //   path: RouteEnum.RELEASE_LOG,
  //   element: lazy(() => import("features/stock/ReleaseLog")),
  // },

  // {
  //   path: RouteEnum.MATERIAL_ISSUANCE,
  //   element: lazy(() => import("features/stock/StockOutbound")),
  // },
  // {
  //   path: RouteEnum.STOCK_REQUISITION,
  //   element: lazy(() => import("features/requisition/Requisition")),
  // },
  // {
  //   path: RouteEnum.MATERIAL_ACCEPTANCE,
  //   element: lazy(() => import("features/stock/ConfirmRelease")),
  // },
  // {
  //   path: RouteEnum.PRODUCT_RACK,
  //   element: lazy(() => import("features/itemCreation/Product-Rack")),
  // },
  // {
  //   path: RouteEnum.DELIVERY_REPORT,
  //   element: lazy(() => import("features/stock/DeliveryLog")),
  // },
  // {
  //   path: RouteEnum.INTAKES_REPORT,
  //   element: lazy(() => import("features/stock/IntakesLog")),
  // },
  // {
  //   path: RouteEnum.LOCATION_MANAGEMENT,
  //   element: lazy(() => import("features/systemManagement/LocationManagement")),
  // },

  // {
  //   path: RouteEnum.SETTINGS,
  //   element: lazy(() => import("features/settings/Categories")),
  // },
]);

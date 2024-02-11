import { lazy, useState } from "react";
import Suspense from "common/Suspense";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { configureRoutes } from "utils/RouteUtils";
import { RouteEnum } from "constants/RouteConstants";
import Footer from "common/Footer";
import LoginHeader from "common/LoginHeader";
import Sidebar from "features/sidebar/Sidebar";
import Menu from "@mui/icons-material/Menu";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { useMediaQuery } from "@mui/material";
import nephets from "images/Nephets Assets/Nehpets Consulting Grey Outline 1.svg";
import nephetsColored from "images/Nephets Assets/Nehpets Consulting Colored.svg";

function AppPublic() {
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const issm = useMediaQuery(MediaQueryBreakpointEnum.sm);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const routes = useRoutes(ROUTES);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="">
      {/* {!issm && (
        <div className={`${location.pathname === "/ielts" ? 'bg-white flex justify-between fixed top-0 z-20 p-2 w-full px-[6%] pb-0 ' : "pb-0 bg-[#662817] p-2 flex justify-between fixed top-0 z-20 w-full px-[6%]"}`}>
          <img
            className="w-16"
            alt="Logo"
            src={location.pathname === "/ielts" ? nephetsColored : nephets}
          />
          <Menu className="text-white  w-12 text-3xl" />
        </div>
      )} */}
      {issm && (
        <LoginHeader white={location.pathname === "/ielts" ? true : false} />
      )}
      {!issm && <Sidebar />}

      <div className={issm && "w-full mt-20"}>
        <Suspense>{routes}</Suspense>;
      </div>
      <Footer />
    </div>
  );
}

const ROUTES = configureRoutes([
  {
    path: "*",
    element: <Navigate to={RouteEnum.HOME} replace />,
  },
  {
    path: RouteEnum.HOME,
    element: lazy(() => import("features/home/Home")),
  },
  {
    path: RouteEnum.ABOUT_US,
    element: lazy(() => import("features/aboutUs/AboutUs")),
  },
  {
    path: RouteEnum.TEMPORAL_RESIDENCE,
    element: lazy(() => import("features/residence/TemporalResidence")),
  },

  {
    path: RouteEnum.IELTS,
    element: lazy(() => import("features/enrollmentForms/EnrollmentIELTS")),
  },
  {
    path: RouteEnum.COACHING,
    element: lazy(() => import("features/coaching/Coaching")),
  },
  {
    path: RouteEnum.PERMANENT_RESIDENCE,
    element: lazy(() => import("features/residence/PermanentResidence.js")),
  },
  {
    path: RouteEnum.VISA,
    element: lazy(() => import("features/visa/VisaForm")),
  },
  // {
  //   path: RouteEnum.LOGIN,
  //   element: lazy(() => import("features/login/Login")),
  // },
]);

export default AppPublic;

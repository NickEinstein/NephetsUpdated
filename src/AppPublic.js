import { lazy } from "react";
import Suspense from "common/Suspense";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { configureRoutes } from "utils/RouteUtils";
import { RouteEnum } from "constants/RouteConstants";
import Footer from "common/Footer";
import LoginHeader from "common/LoginHeader";

function AppPublic() {
  const location = useLocation();
  const routes = useRoutes(ROUTES);

  console.log(location.pathname);
  return (
    <div>
      <LoginHeader white={location.pathname == "/ielts" ? true : false} />
      <Suspense>{routes}</Suspense>;
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
    element: lazy(() => import("features/residence/PermanentlResidence")),
  },
  // {
  //   path: RouteEnum.SIGNUPCLIENTF,
  //   element: lazy(() => import("features/signup/SignUpClientF")),
  // },
  // {
  //   path: RouteEnum.LOGIN,
  //   element: lazy(() => import("features/login/Login")),
  // },
]);

export default AppPublic;

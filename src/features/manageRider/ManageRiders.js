import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoorLogo from "images/Ellipse 30.png";
// import ManageCompanyCard from 'common/ManageCompanyCard'

// import { RouteEnum } from "constants/RouteConstants";
// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import gigLogo from "images/Ellipse 56.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCardsServices";
import ManageCompanyCard from "features/manageCompanies/ManageCompanyCard";
import ManageCompaniesTable from "features/manageCompanies/ManageCompaniesTable";

import {
  RiArrowDownSFill,
  RiArrowDownSLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import { MdRefresh } from "react-icons/md";
import ToDoorSearch from "common/ToDoorSearch";
import moment from "moment";
import { del, get, post } from "services/fetch";
function ManageRiders(props) {
  const history = useNavigate();
  const [userType, setUserType] = useState("rider");
  const [pageNo, setPageNo] = useState(1);
  const [allBikez, setAllBikez] = useState([]);

  const getAllCompanyQueryResult = UserApi.useGetAllQuery({
    userType: "company",
  });
  const getCompanyStatisticsQueryResult = UserApi.useGetCompanyStatisticsQuery(
    {}
  );
  const [mappingVal, setMappingVal] = useState([]);

  const companyStatistics = getCompanyStatisticsQueryResult?.data;
  const totalCompanies = getAllCompanyQueryResult?.data?.data;

  const getAllRIderQueryResult = UserApi.useGetAllQuery({ userType: "rider" });
  const totalRiders = getAllRIderQueryResult?.data?.data;

  const getAllBikesQueryResult = UserApi?.useGetAllBikesQuery({ pageNo });
  const totalPages = +getAllRIderQueryResult?.data?.meta?.totalNoOfPages;
  const bikers = getAllBikesQueryResult?.data?.data;

  const getAllUnVerifiedQueryResult = UserApi.useGetAllVerifiedQuery({
    userType,
    verified: false,
    pageNo,
  });
  const getAllVerifiedQueryResult = UserApi.useGetAllVerifiedQuery({
    userType,
    verified: true,
    pageNo,
  });
  const totalVerifiedUsers = getAllVerifiedQueryResult?.data?.data;
  const totalUnverifiedUsers = getAllUnVerifiedQueryResult?.data?.data;

  const onPageChange = (page) => {
    setPageNo(page);

    console.log(page);
  };

  useEffect(() => {
    getBikes();
  }, [pageNo]);

  const getBikes = async () => {
    const res = await get({
      endpoint: `api/company/getalluser?userType=rider&pageNo=${pageNo}`,
      auth: true,
    });
    setAllBikez(res?.data?.data);

    console.log(res.data.data);
  };

  const deleteBikes = async (id) => {
    const res = await del({
      endpoint: `api/super-admin/deleteRider?userId=${id}`,
      auth: true,
    });
    getBikes();
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const redirect = () => {
    history("/complete-signUp");
  };

  const getCompanyName = (id) => {
    if (totalCompanies && allBikez && id) {
      let compName = totalCompanies.find((e) => e._id == id);
      console.log(compName?.fname);
      return compName;
    }
  };

  const allRiders = allBikez?.map((e) => ({
    image: e?.profileUrl,
    name: `${e?.fname}`,
    company: e?.companyId
      ? getCompanyName(e?.companyId)?.fname
      : "Self Registered",
    id: e?.email,
    // ratings: e.userRating && e.userRating !== 0 ? e.userRating : "4",
    ratings: moment(e?.created_at).format("ll"),
    tripsCompleted: "-",
    phoneNo: e?.phoneNo,
    status: e?.currTripState,
    userId: e?._id,
    verified: e?.verified,
    info: e,
  }));

  console.log(allRiders);

  const tableArray = [
    {
      image: gigLogo,
      name: "Nickky Samuel jonas  ",
      company: "GIG Logistics",
      Id: "2234456",
      userRating: "4",
    },

    // {
    //   image: gigLogo,
    //   name: "John jimmy Samuel  ",
    //   company: "GIG Logistics",
    //   Id: "2234456",
    //   ratings: "4",
    // },
  ];

  const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().trim().required(),
      password: yup.string().trim().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // localStorage.setItem('location', values.location)
      redirect();

      try {
        const data = await loginMuation({ data: values }).unwrap();
        // TODO extra login
        // redirect()
        enqueueSnackbar("Logged in successful", { variant: "success" });
      } catch (error) {
        enqueueSnackbar(error?.data?.message, "Failed to login", {
          variant: "error",
        });
      }
    },
  });

  // if (authUser.accessToken) {
  //   return <Navigate to={RouteEnum.HOME} />;
  // }

  const newsDisplay = (val, bol) => {
    // console.log("Samson"?.includes(val));
    // console.log(companyRiders);
    console.log(val);
    if (bol)
      setMappingVal(
        val?.map((e) => ({
          image: e?.profileUrl,
          name: `${e?.fname}`,
          company: e?.companyId
            ? getCompanyName(e?.companyId)?.fname
            : "Self Registered",
          id: e?.email,
          // ratings: e.userRating && e.userRating !== 0 ? e.userRating : "4",
          ratings: moment(e?.created_at).format("ll"),
          tripsCompleted: "-",
          phoneNo: e?.phoneNo,
          status: e?.currTripState,
          userId: e?._id,
          verified: e?.verified,
          info: e,
        }))
      );
    else {
      setMappingVal([]);
    }
  };

  return (
    <div>
      {/* <ToDoorSearch /> */}
      {/* <div className="flex items-center" style={{ backGroundColor: "#1E1E1E" }}>
        <img src={gigLogo} />
        <Typography variant="h5" className="font-bold ml-4 ">
          GIG LOGISTICS
        </Typography>
      </div> */}
      <div className="flex items-end mr-3 mt-12 w-3/6">
        <div
          className="mr-4 hover:cursor-pointer"
          onClick={() => {
            newsDisplay(allBikez, false);
          }}
        >
          <WallCards
            className="mr-3"
            rider={false}
            big={true}
            green={true}
            name="Total Riders"
            count={companyStatistics?.total_riders}
          />
        </div>
        <div>
          <div className="relative w-full ">
            <div
              className="flex-between px-2 w-full text-xs absolute "
              style={{ top: "-20px" }}
            >
              <div className="flex">
                <p className="font-bold mr-1 flextext-xs self-end">Today</p>
                <div>
                  <RiArrowDownSLine
                    className=""
                    style={{ fontSize: "16px", color: "#494949" }}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs mr-1 opacity-50">
                  <MdRefresh />
                </span>
                <span className="text-xs opacity-50">Refresh</span>
              </div>
            </div>
          </div>
          <div className="flex">
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                newsDisplay(totalVerifiedUsers, true);
              }}
            >
              <WallCards
                short={true}
                name="Verified"
                count={companyStatistics?.verified_rider}
              />
            </div>
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                newsDisplay(totalUnverifiedUsers, true);
              }}
            >
              <WallCards
                short={true}
                name="Un-Verified"
                count={companyStatistics?.unverified_rider}
              />
            </div>
          </div>
        </div>

        {/* <WallCards name='Total Raiders' count='116,019'/>
          <WallCards name='Rides in progress' count='13'/>
          <WallCards name='Active vehicles' count='8'/>
          <WallCards name='Earnings' count='3,000,000'/> */}
      </div>
      <Typography variant="h5" className="font-bold mt-8 text-primary-main">
        All Riders
      </Typography>

      {/* <nav className="flex justify-center">
        <ul className="flex">
          {pageNo > 1 && (
            <li>
              <a
                href="#"
                onClick={() => onPageChange(pageNo - 1)}
                className="py-2 px-4 bg-gray-400 text-white font-bold rounded-l hover:bg-gray-600"
              >
                Prev
              </a>
            </li>
          )}
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                href="#"
                onClick={() => onPageChange(number)}
                className={
                  pageNo === number
                    ? "py-2 px-4 bg-primary-main text-white font-bold"
                    : "py-2 px-4 hover:bg-gray-400/10"
                }
              >
                {number}
              </a>
            </li>
          ))}
          {pageNo < pageNumbers.length && (
            <li>
              <a
                href="#"
                onClick={() => onPageChange(pageNo + 1)}
                className="py-2 px-4 bg-gray-400 text-white font-bold rounded-r hover:bg-gray-600"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav> */}
      {/* ( (mappingVal.length && mappingVal) || // (mappingValCompany.length &&
      mappingValCompany) || totalCompanies ) */}
      {((mappingVal.length && mappingVal) || allRiders)?.map((e, idx) => (
        <ManageCompaniesTable
          deleteBikes={deleteBikes}
          tableArray={e}
          key={idx}
          info={e.info}
          getBikes={getBikes}
        />
      ))}
      <nav className="flex justify-center mt-5">
        <ul className="flex">
          {pageNo > 1 && (
            <li>
              <a
                href="#"
                onClick={() => onPageChange(pageNo - 1)}
                className="py-2 px-4 bg-gray-400 text-white font-bold rounded-l hover:bg-gray-600"
              >
                Prev
              </a>
            </li>
          )}
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                href="#"
                onClick={() => onPageChange(number)}
                className={
                  pageNo === number
                    ? "py-2 px-4 bg-primary-main text-white font-bold"
                    : "py-2 px-4 hover:bg-gray-400/10"
                }
              >
                {number}
              </a>
            </li>
          ))}
          {pageNo < pageNumbers.length && (
            <li>
              <a
                href="#"
                onClick={() => onPageChange(pageNo + 1)}
                className="py-2 px-4 bg-gray-400 text-white font-bold rounded-r hover:bg-gray-600"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
      {/* <div className="flex justify-between my-7">
                        <ManageCompanyCard/>
                        <ManageCompanyCard/>
                        <ManageCompanyCard/>
                    </div>
                    <div className="flex justify-between my-7">
                        <ManageCompanyCard/>
                        <ManageCompanyCard/>
                        <ManageCompanyCard/>
                    </div>
                    <div className="flex justify-between my-7">
                        <ManageCompanyCard/>
                        <ManageCompanyCard/>
                        <ManageCompanyCard/>
                    </div> */}
    </div>
  );
}

export default ManageRiders;

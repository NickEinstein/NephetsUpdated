import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import Modals from "common/Modal";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import { post, get, put } from "services/fetch";
import pdf from "images/pdf.png";
import moment from "moment";

import { HiOutlineTrash } from "react-icons/hi";
import { TbMessage2, TbPhoneCall } from "react-icons/tb";

import {
  MdOutlineKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
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
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Input,
  MenuItem,
  Modal,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCardsServices";
import ManageCompanyCard from "./ManageCompanyCard";

function ManageCompaniesTable(props) {
  const [suspend, setSuspend] = React.useState(false);
  const [closeModal, setCloseModal] = React.useState("");
  const [show, setShow] = React.useState("");
  const [deleteId, setDeleteId] = React.useState("");
  const [user, setUser] = useState();
  const [count, setcount] = useState(0);
  const [opens, setOpens] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  //   console.log(event)
  // };

  //  const getCompanyName = (id) => {
  //    let compName = totalCompanies.filter((e) => e._id == id);
  //    console.log(compName);
  //    return compName;
  //  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minHeight: "520px",
    bgcolor: "background.paper",
    borderRadius: "3%",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const history = useNavigate();
  console.log(props);

  const openModal = (bol, id) => {
    setCloseModal(!closeModal);
    setSuspend(bol);
    setDeleteId(id);
  };

  const redirect = () => {
    history("/complete-signUp");
  };

  const tableArrayz = [
    {
      image: gigLogo,
      name: "Nickky Samuel jonas  ",
      company: "GIG Logistics",
      Id: "2234456",
      ratings: "4",
    },

    {
      image: gigLogo,
      name: "John jimmy Samuel  ",
      company: "GIG Logistics",
      Id: "2234456",
      ratings: "4",
    },
  ];

  const openBelow = () => {
    setShow(!show);
  };

  // const deleteRider = async (companyId) => {
  //   const res = await get({
  //     endpoint: `api/super-admin/deleteRider?userId=${companyId}`,
  //     //  body: { ...payload },
  //     auth: true,
  //   });
  //   console.log(res.data.data);
  //   //  setCompanyEarns(res.data.data);
  // };

  // if (authUser.accessToken) {
  //   return <Navigate to={RouteEnum.HOME} />;
  // }
  const approveDecline = async (status, companyId, message) => {
    const res = status
      ? await put({
          endpoint: `api/super-admin/approveUser?id=${companyId}`,
          //  body: { ...payload },
          auth: true,
        })
      : await put({
          endpoint: `api/super-admin/rejectUser?id=${companyId}`,
          //  body: { ...payload },
          auth: true,
        });

    if (res.data.success) {
      props?.getBikes();
      enqueueSnackbar(message ? message : res?.data?.message, {
        variant: "succes",
      });
    } else {
      console.log(res);
      enqueueSnackbar(res?.data?.message, { variant: "error" });
      props?.getBikes();
    }
  };

  const deleteRider = async (companyId, message) => {
    const res = await delete {
      endpoint: `api/super-admin/deleteRider?userId=${companyId}`,
      //  body: { ...payload },
      auth: true,
    };

    if (res.data.success) {
      props?.getBikes();
      enqueueSnackbar(message ? message : res?.data?.message, {
        variant: "succes",
      });
    } else {
      console.log(res);
      enqueueSnackbar(res?.data?.message, { variant: "error" });
      props?.getBikes();
    }
  };

  useEffect(() => {
    console.log(props?.info);
    setUser(props?.info);
  }, [props?.tableArray]);

  return (
    <div>
      {/* { props.tableArray.map((e)=> */}
      <div className="w-full">
        <div
          onClick={openBelow}
          style={{ border: "1px solid #DADADA" }}
          className={
            props?.tableArray?.verified || props?.suspendHide
              ? " cursor-pointer mt-2 px-2 w-full flex border2 background-table min-h-[50%]"
              : " cursor-pointer mt-2 px-2 w-full flex border2 bg-[#FFCD0061] min-h-[50%]"
          }
        >
          <div className="w-[20%] py-3  flex gap-2">
            <Avatar
              src={props?.tableArray?.image}
              className="rounded-full border h-12 w-12"
            />

            <div className="">
              <p className="medium-size">Name</p>
              <Typography variant="" class="text-sm">
                {props?.tableArray?.name}
              </Typography>
              <Typography variant="" class="text-[10px]">
                '{props?.tableArray?.companyName}'
              </Typography>
            </div>
          </div>
          {/* <div className="w-full  p-3 ">
            <p className="medium-size">company</p>
            <Typography variant="" class="text-sm">
              {props?.tableArray?.company}
            </Typography>
          </div> */}
          <div className="w-[25%]   p-3 ">
            <p className="medium-size">Email</p>
            <Typography variant="" class="text-sm">
              {props?.tableArray?.id}
            </Typography>
          </div>
          <div className="w-[15%]   p-3 ">
            <p className="medium-size">Reg. Date</p>
            <Typography variant="" class="text-sm">
              {props?.tableArray?.ratings}
            </Typography>
          </div>
          <div className="w-[20%]   p-3 ">
            <p className="medium-size">Mobile No.</p>
            <Typography variant="" class="text-sm">
              {props?.tableArray?.phoneNo}
            </Typography>
          </div>
          <div className="w-[15%]   p-3 ">
            <p className="medium-size">Status</p>
            <Typography className="text-[11px]" variant="" class="text-sm">
              {props?.tableArray?.info?.verified
                ? "Verified"
                : !props?.tableArray?.info?.verified &&
                  !props?.tableArray?.info?.driverLicenceUrl &&
                  !props?.tableArray?.info?.bikePhotoUrl
                ? "No Document Uploaded"
                : !props?.tableArray?.info?.verified &&
                  !props?.tableArray?.info?.driverLicenceUrl
                ? "Driver's Licence Not uploaded"
                : !props?.tableArray?.info?.verified &&
                  !props?.tableArray?.info?.bikePhotoUrl
                ? "Bike Photo not uploaded"
                : "Pending Verification"}
            </Typography>
          </div>
          {/* <div className="w-full  p-3 ">
            <p className="medium-size">status</p>
            <Typography variant="" class="text-sm">
              {props?.tableArray?.status}
            </Typography>
          </div> */}
          <div className="w-[8%]    p-3">
            <p className="medium-size">
              {!show ? (
                <MdOutlineKeyboardArrowDown
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "#888888",
                  }}
                />
              ) : (
                <MdKeyboardArrowRight
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "#888888",
                  }}
                />
              )}
            </p>
          </div>
        </div>
        {show && (
          <div className="w-full flex justify-between background-table p-6">
            <div>
              {
                <Button
                  onClick={() => {
                    setOpens(true);
                  }}
                  color="primary"
                  // style={{ backgroundColor: "#20B553" }}
                  className="px-6 min-w-[110px] ml-2"
                  // startIcon={<TbMessage2 />}
                >
                  View Details
                </Button>
              }
              <Button
                startIcon={<TbPhoneCall />}
                style={{ backgroundColor: "#F7742B" }}
                className="px-6 min-w-[110px] ml-2"
              >
                Call
              </Button>
            </div>
            {!props?.suspendHide && (
              // <button>Show Button</button>
              <div className="flex justify-between items-center">
                <Button
                  // onClick={() => openModal(true)}
                  onClick={() =>
                    approveDecline(false, user?._id, "user suspended")
                  }
                  style={{ backgroundColor: "#DCDCDC", color: "black" }}
                  className="mr-2 px-6 min-w-[110px] ml-2"
                >
                  Suspend driver
                </Button>
                {/* <Button className='px-6 min-w-[110px] ml-2'>Call</Button> */}
                <HiOutlineTrash
                  onClick={() => openModal(false, props?.tableArray?.userId)}
                  style={{
                    fontSize: "26px",
                    cursor: "pointer",
                    color: "#888888",
                  }}
                />
              </div>
            )}
          </div>
        )}
        <Modals
          suspend={suspend}
          deleteId={deleteId}
          openModal={openModal}
          closeModal={closeModal}
          companyId={deleteId}
          deleteRider={props?.deleteBikes}
        />
      </div>
      {/* )} */}

      <Modal
        // open={true}
        open={opens}
        onClose={() => setOpens(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <div>
              <div className="flex gap-8">
                <div className="flex">
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={user?.profileUrl}
                  />
                </div>
                <div className="mt-4">
                  <Typography className="font-bold mb-5" variant="h5">
                    {user?.fname}
                  </Typography>
                  {!user?.verified && !props?.suspendHide && (
                    <div class="flex gap-5">
                      <Button
                        disabled={
                          !user?.driverLicenceUrl || !user?.bikePhotoUrl
                        }
                        onClick={() => approveDecline(true, user?._id)}
                        className="bg-green-500 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => approveDecline(false, user?._id)}
                        className="bg-red-500"
                      >
                        Decline
                      </Button>
                      <Button
                        onClick={() => deleteRider(user?._id)}
                        className="bg-black/10"
                      >
                        <span class="text-black">Delete</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <Divider className="my-8" />
              {/* <div class="flex gap-20">
                <div className=" gap-16 font-semibold">
                  <Typography className="my-3 font-semibold">
                    Total Earnings
                  </Typography>
                  <Typography className="font-semibold text-primary-main">
                    {" "}
                    XXXXXXX
                  </Typography>
                </div>
                <div className=" font-semibold">
                  <Typography className="my-3 font-semibold">
                    No Of Rides
                  </Typography>
                  <Typography className="font-semibold text-primary-main">
                    XXXXX
                  </Typography>
                </div>
              </div>
              <Divider className="my-8" /> */}
              <div class="flex gap-16 ">
                <div className="flex flex-col gap-3 font-semibold">
                  <Typography className="font-semibold">Address:</Typography>
                  <Typography className="font-semibold">
                    Phone Number:
                  </Typography>
                  <Typography className="font-semibold">
                    Email address:
                  </Typography>
                  <Typography className="font-semibold">
                    Date of Birth:
                  </Typography>
                  {/* <Typography className="font-semibold">ID Card:</Typography>
                  <Typography className="font-semibold">
                    Last Login Image
                  </Typography> */}
                </div>
                <div className="flex flex-col gap-3">
                  <Typography>{user?.city}</Typography>
                  <Typography>{user?.phoneNo}</Typography>
                  <Typography>{user?.email}</Typography>
                  <Typography>{moment(user?.dob).format("ll")}</Typography>
                  {/* <Typography>{"****"}</Typography>
                  <Typography>{"***"}</Typography> */}
                </div>
              </div>
              <div class="flex flex-col gap-4 mt-4 w-1/2">
                <div className="grid grid-cols-2 gap-5 items-center">
                  <Typography className="font-semibold ">
                    Driver's Licence Document:
                  </Typography>
                  {/* {user?.companyRegistrationPhotoUrl?.endsWith(".pdf") ? (
                    <a href={user?.companyRegistrationPhotoUrl} target="_blank">
                      <img className="w-full h-32 border-none" src={pdf} />
                    </a>
                  ) : (
                    <a href={user?.companyRegistrationPhotoUrl} target="_blank">
                      <img
                        className="w-[300px] h-32  border-none"
                        src={user?.companyRegistrationPhotoUrl}
                      />
                    </a>
                  )} */}
                  {!user?.driverLicenceUrl ? (
                    <div className="w-full flex flex-col justify-start items-start gap-5">
                      <Typography className="text-yellow-400" variant="">
                        Not Yet Uploaded.
                      </Typography>
                    </div>
                  ) : (
                    <Button
                      className="text-white italic bg-primary-main min-w-[170px]"
                      variant=""
                    >
                      <a href={user?.driverLicenceUrl} target="_blank">
                        View Driver's Liscence
                      </a>
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-5 items-center">
                  <Typography className="font-semibold ">
                    Bike Photo:
                  </Typography>
                  {/* {user?.companyRegistrationPhotoUrl?.endsWith(".pdf") ? (
                    <a href={user?.companyRegistrationPhotoUrl} target="_blank">
                      <img className="w-full h-32 border-none" src={pdf} />
                    </a>
                  ) : (
                    <a href={user?.companyRegistrationPhotoUrl} target="_blank">
                      <img
                        className="w-[300px] h-32  border-none"
                        src={user?.companyRegistrationPhotoUrl}
                      />
                    </a>
                  )} */}
                  {!user?.bikePhotoUrl ? (
                    <div className="w-full flex flex-col justify-start items-start gap-5">
                      <Typography className="text-yellow-400" variant="">
                        Not Yet Uploaded.
                      </Typography>
                    </div>
                  ) : (
                    <Button
                      className="text-white italic bg-primary-main min-w-[170px]"
                      variant=""
                    >
                      <a href={user?.bikePhotoUrl} target="_blank">
                        View Bike Photo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default ManageCompaniesTable;

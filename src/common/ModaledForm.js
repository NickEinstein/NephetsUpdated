import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import { MdRefresh, MdOutlineSearch, MdSearch } from "react-icons/md";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Link, Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCardsServices";
import { AccountCircle, Wallet } from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import { post, get, put } from "services/fetch";
import SuperAdminApi from "apis/UserApi";
import MyTable from "common/MyTable";
import ExpenseStepper from "common/ExpenseStepper";

function Signup(props) {
  const [userType, setUserType] = React.useState("");
  const [show, setshow] = React.useState(false);
  const [dataType, setdataType] = React.useState("companies");
  const [filtered, setFiltered] = React.useState([]);

  //  const getUserStatsQueryResult = UserApi.useGetStatsQuery();
  //  console.log(getUserStatsQueryResult);
  //  const userStats = getUserStatsQueryResult?.data?.data;
  // const getStoreProductsQueryResult = UserApi.useGetStoreProductsQuery({});
  // const storeProducts = getStoreProductsQueryResult?.data;

  // console.log(getStoreProductsQueryResult)

  // console.log(companyStatistics);
  // const getAllRIderQueryResult = UserApi.useGetAllQuery({ userType: "rider" });
  // const totalRiders = getAllRIderQueryResult?.data?.data;

  // const getAllCompanyQueryResult = UserApi.useGetAllQuery({
  //   userType: "company",
  // });
  // const totalCompanies = getAllCompanyQueryResult?.data?.data;

  // const getAllCustomerQueryResult = UserApi.useGetAllQuery({
  //   userType: "customer",
  // });
  // const totalCustomers = getAllCustomerQueryResult?.data?.data;

  //  console.log(getAllQueryResult.data.data);

  const history = useNavigate();

  // const redirect = () => {
  //   history("/complete-signUp");
  // };

  const authUser = useAuthUser();

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [age, setAge] = React.useState();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="w-full ">
      <div class="flex gap-8  w-full items-start bg-white">
        <Card className="flex gap-3 w-2/5 flex-col">
          <FormControl className="mt-5" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Budget Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="   Select Budget Type "
              variant="standard"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="mt-5" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Budget Item Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Select Budget Item Category"
              onChange={handleChange}
              variant="standard"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            className="bg-[#E8FFDA] border-[#3C7E2D] text-black w-full px-8 "
          >
            View Approved Initiatives
          </Button>
        </Card>
        <div className="w-full">
          <div className="w-full">
            <Card className="flex gap-3 flex-col">
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Field 1"
                name="Subject"
                // value={formData.quantity}
                onChange={handleChange}
                fullWidth
                placeholder="Subject"
              />
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Field 1"
                name="Transaction ID/Reference Number"
                // value={formData.quantity}
                onChange={handleChange}
                fullWidth
                placeholder="Transaction ID/Reference Number"
              />
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Field 1"
                name="From:"
                // value={formData.quantity}
                onChange={handleChange}
                fullWidth
                placeholder="From:"
              />
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Field 1"
                name="To:"
                // value={formData.quantity}
                onChange={handleChange}
                fullWidth
                placeholder="To:"
              />
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Field 1"
                name="Through:"
                // value={formData.quantity}
                onChange={handleChange}
                fullWidth
                placeholder="Through:"
              />
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Field 1"
                name="Project Description:"
                // value={formData.quantity}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                placeholder="Project Description:"
              />
              <TextField
                variant="outlined"
                // color="error"
                className="bg-white border border-2 border-primary-main rounded-full"
                // label="Field 1"
                name="Approval Details "
                // value={formData.quantity}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                placeholder="Approval Details "
              />
            </Card>
            <div className="flex items-center gap-3">
              <Typography className="font-bold">Urgency Status:</Typography>
              <div className="flex gap-2">
                <Button className="py-2" variant="outlined">
                  Regular
                </Button>
                <Button className="py-2" variant="outlined">
                  Urgent
                </Button>
                <Button className="py-2" variant="outlined">
                  Super Urgent
                </Button>
              </div>
            </div>
            <div>
              <Typography>Attach Documents</Typography>
              <Button>Upload Document</Button>
            </div>
          </div>

          <div className="w-full flex-col flex gap-2">
            <Button className="w-full bg-[#E8FFDA] text-black font-bold">
              Save Draft
            </Button>
            <Button className="w-full font-bold">Submit Request</Button>
          </div>
        </div>
      </div>

      <div>
        Procurement Industrial lab
        <div>
          <TextField
            variant="outlined"
            // color="error"
            className="bg-white  border-2 border-primary-main rounded-full"
            // label="Field 1"
            name="Approval Details "
            // value={formData.quantity}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            placeholder="Approval Details "
          />
          <div class="flex gap-6 items-center">
            <TextField
              variant="outlined"
              // color="error"
              className="bg-white border-2 border-primary-main rounded-full"
              // label="Field 1"
              name="Approval Details "
              // value={formData.quantity}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              placeholder="Approval Details "
            />
            <TextField
              variant="outlined"
              // color="error"
              className="bg-white border-2 border-primary-main rounded-full"
              // label="Field 1"
              name="Approval Details "
              // value={formData.quantity}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              placeholder="Approval Details "
            />
          </div>
          <TextField
            variant="outlined"
            // color="error"
            className="bg-white border-2 border-primary-main rounded-full"
            // label="Field 1"
            name="Approval Details "
            // value={formData.quantity}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            placeholder="Approval Details "
          />
          <TextField
            variant="outlined"
            // color="error"
            className="bg-white border-2 border-primary-main rounded-full"
            // label="Field 1"
            name="Approval Details "
            // value={formData.quantity}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            placeholder="Approval Details "
          />

          <div>
            <Typography className="font-bold text-primary-main">
              Project Description
            </Typography>
            <Typography className="p-2 border border-primary-main rounded">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
            </Typography>
          </div>

          <div className="w-full mt-7">
            {" "}
            <div className="bg-primary-light p-2 w-full flex justify-between">
              <Typography className="font-bold">Approval Journey</Typography>
              <Button className="font-bold bg-[#3C7E2D]">Collapse</Button>
            </div>
            <div className="w-4/5">
              <div>
                <Typography>Approving Officers Comment</Typography>
                <div className="grid grid-cols-9">
                  {/* <div className="flex gap-5"> */}
                  <Typography className="col-span-3 p-2 bg-primary-light font-bold">
                    Assigned Officers
                  </Typography>
                  <Typography className="col-span-2 p-2 bg-primary-light font-bold">
                    In Tray
                  </Typography>
                  <Typography className="col-span-1 p-2 bg-primary-light font-bold">
                    Out Tray
                  </Typography>
                  <Typography className="col-span-3 p-2 bg-primary-light font-bold">
                    Comment
                  </Typography>
                  {/* </div> */}
                  <div className="flex items-center gap-2 col-span-3">
                    <Avatar />
                    <div>
                      <Typography>Ehigiamouse Emmanuel</Typography>
                      <Typography className="text-ssm text-[#A39C9C]">
                        Director of Admin & Store
                      </Typography>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Typography>August 23, 2020; 09.45am</Typography>
                    <Typography className="text-ssm text-[#A39C9C]">
                      7 days ago
                    </Typography>
                    <Typography className="text-ssm text-[#A39C9C]">
                      Uhunmwonde, Edo State
                    </Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography>Awaiting</Typography>
                    <Typography className="text-ssm text-[#A39C9C]">
                      0 minutes
                    </Typography>
                  </div>
                  <div className="col-span-3">
                    <Typography>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English.
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-7">
            <div className="bg-primary-light p-2 w-full flex justify-between">
              <Typography className="font-bold">Assign Memo</Typography>
              <Button className="font-bold bg-[#3C7E2D]">Collapse</Button>
            </div>
            <div className="w-4/5 flex flex-col gap-4">
              <TextField
                variant="outlined"
                // color="error"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Field 1"
                name="Select "
                // value={formData.quantity}
                onChange={handleChange}
                // multiline
                rows={4}
                fullWidth
                placeholder="Approval Assignee "
              />

              <TextField
                variant="outlined"
                // color="error"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Field 1"
                name="Details "
                // value={formData.quantity}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                placeholder="Details "
              />
              <Button className="p-3 text-base font-bold">
                Submit Details
              </Button>
            </div>
          </div>

          <div className="w-full mt-7">
            <div className="bg-primary-light p-2 w-full flex justify-between">
              <Typography className="font-bold">Rake Action</Typography>
              <Button className="font-bold bg-[#3C7E2D]">Collapse</Button>
            </div>
            <div className="w-4/5 flex flex-col gap-4">
              <Typography>Input your comments</Typography>
              <TextField
                variant="outlined"
                // color="error"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Field 1"
                name="Details "
                // value={formData.quantity}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                placeholder="Details "
              />
              <div className="flex gw-full gap-4">
                <Button className="bg-[#3C7E2D]/60 w-full p-3 text-base font-bold">
                  Select an Action
                </Button>
                <Button className=" w-full p-3 text-base font-bold">
                  Submit Review
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

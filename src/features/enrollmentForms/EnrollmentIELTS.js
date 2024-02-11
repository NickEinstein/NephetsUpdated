import React from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
  Checkbox,
  RadioGroup,
  FormControl,
  Radio,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { post } from "services/fetch";
import { useState } from "react";

const MyForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [start_date, setStart_date] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [formdata, setFormdata] = useState({
    firstName: " ",
    lastName: " ",
    phoneNumber: " ",
    email: " ",
    address: " ",
    purpose: " ",
    ieltsReg: " ",
    ieltsExamDate: " ",
    tutorial: " ",
    studyMaterials: " ",
    consultation: " ",
    examinationLocation: " ",
  });

  const [paydata, setPaydata] = useState({
    amount: "100",
    email: "oquantoe@outlook.com",
    firstName: "Daniel",
    lastName: "Okon",
  });

  const onChange = (e) => {
    // console.log(e?.target?.value);
    // console.log(e);
    // console.log(name);

    if (e.target.name == "purpose") {
      setFormdata({
        ...formdata,
        [e.target.name]:
          e.target.value == "100,000"
            ? "IELTS Registration"
            : e.target.value == "150,000"
            ? "IELTS Reg/Tutorial/materials "
            : e.target.value == "30,000"
            ? "IELTS Tutorial"
            : "",
      });
      return;
    }

    console.log(e.target.value);
    console.log(e.target.value);
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formdata);

  const onChangePay = (e) => {
    // console.log(e?.target?.value);
    // console.log(e);
    // console.log(name);

    console.log(e.target.value);
    console.log(e.target.value);
    setPaydata({
      ...paydata,
      [e.target.name]: e.target.value,
    });
  };

  const add = async () => {
    // let createCustomer = {

    // };

    handleClickOpen();

    const res = await post({
      endpoint: `book`,
      body: { ...formdata },
      auth: false,
    });
  };

  const pay = async () => {
    let payload = {
      amount:
        paydata.amount == "100,000"
          ? 100000
          : paydata.amount == "150,000"
          ? 150000
          : paydata.amount == "30,000"
          ? 30000
          : null,
      email: formdata.email,
      firstName: formdata.firstName,
      lastName: formdata.lastName,
    };

    const res = await post({
      endpoint: `pay`,
      body: { ...payload },
      auth: false,
    });
    console.log(res);
    if (res.status == 200) {
      enqueueSnackbar(
        res?.data?.message || "Please wait while we re-direct you to Paystack",
        {
          variant: "success",
        }
      );
      setTimeout((window.location.href = `${res?.data?.url}`), 2000);
    } else {
      enqueueSnackbar(res?.data?.message || "Something went Wrond", {
        variant: "error",
      });
    }
  };

  return (
    <Container className="" maxWidth="xl">
      <div className="flex flex-col gap-6 py-10 px-[25%]">
        <div className="mb-5">
          <Typography className="font-bold text-2xl text-left">
            IELTS Enrollment Form
          </Typography>
          <Typography className=" text-base text-left mt-3">
            This will help us send you updates and recommendations
          </Typography>
        </div>
        <div>
          <Typography className="font-bold">First Name</Typography>
          <TextField
            name="firstName"
            onChange={onChange}
            value={formdata.firstName}
            fullWidth
          />
        </div>
        <div>
          <Typography className="font-bold">Last Name</Typography>
          <TextField
            name="firstName"
            onChange={onChange}
            value={formdata.firstName}
            fullWidth
          />
        </div>
        <div>
          <Typography className="font-bold">Email Address</Typography>
          <TextField
            name="firstName"
            onChange={onChange}
            value={formdata.lastName}
            fullWidth
          />
        </div>
        <div>
          <Typography className="font-bold">Phone Number</Typography>
          <TextField
            name="firstName"
            onChange={onChange}
            value={formdata.phoneNumber}
            fullWidth
          />
        </div>
        <div>
          <Typography className="font-bold">Address</Typography>
          <TextField
            name="firstName"
            onChange={onChange}
            value={formdata.address}
            fullWidth
          />
        </div>
        <div>
          <Typography className="font-bold">Date</Typography>
          <TextField
            name="firstName"
            onChange={onChange}
            value={formdata.ieltsExamDate}
            fullWidth
          />
        </div>
        <Paper className="p-5 bg-[#F6F8FA]">
          <Typography className="font-bold mb-2 text-[18px]">
            Purpose
          </Typography>

          <FormControl fullWidth>
            <RadioGroup
              onChange={onChange}
              className="w-full"
              aria-labelledby="demo-form-control-label-placement"
              name="ieltsReg"
              value={formdata.ieltsReg}
            >
              <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                <Typography className="font-bold">
                  IELTS Registration
                </Typography>

                <FormControlLabel
                  value="IELTS Registration"
                  control={<Radio />}
                  // label="Married"
                  labelPlacement="End"
                />
              </div>

              <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                <Typography className="font-bold">IELTS Tutorial</Typography>

                <FormControlLabel
                  value="IELTS Tutorial"
                  control={<Radio />}
                  // label="Single"
                  labelPlacement="End"
                />
              </div>

              <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                <Typography className="font-bold">
                  IELTS Reg/Tutorial/materials
                </Typography>

                <FormControlLabel
                  value="IELTS Reg/Tutorial/materials"
                  control={<Radio />}
                  // label="Single"
                  labelPlacement="End"
                />
              </div>
            </RadioGroup>
          </FormControl>
        </Paper>

        <div>
          <Typography className="font-bold">Examination Location</Typography>
          <TextField
            name="firstName"
            onChange={onChange}
            value={formdata.firstName}
            fullWidth
          />
        </div>

        <Button onClick={handleClickOpen} className="h-12 px-12 w-4/12 mt-6 bg-[#A2241A]">
          Book Now
        </Button>
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="lg"
          style={{ width: "" }}
          className=""
        >
          <DialogTitle id="alert-dialog-title"> Payment Form</DialogTitle>
          <DialogContent className="w-full ">
            <div className="py-5 md:px-20 flex justify-center">
              <div class="md:w-3/5 w-full">
                <Typography
                  className="py-8 text-center  text-bold text-primary-main "
                  variant="h5"
                >
                  You are Paying For {formdata.purpose}
                </Typography>

                <Box
                  className="flex flex-col"
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, display: "flex" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                
                  <div class="flex flex-col md:flex-row gap-6">
                    <TextField
                      disabled
                      fullWidth
                      value={formdata.firstName}
                      id="outlined-basic"
                      label="First Name"
                      // onChange={onChangePay}
                      variant="outlined"
                      className="w-full"
                      name="firstName"
                    />
                    <TextField
                      value={formdata.lastName}
                      disabled
                      id="outlined-basic"
                      label="Last Name"
                      // onChange={onChangePay}
                      variant="outlined"
                      className="w-full"
                      name="lastName"
                    />
                  </div>
                  <div class="flex gap-6 flex-col md:flex-row ">
                    <TextField
                      value={`${paydata.amount} naira`}
                      disabled
                      className="w-full"
                      id="outlined-basic"
                      label="Amount"
                      name="amount"
                      onChange={onChangePay}
                      variant="outlined"
                    />

                    <TextField
                      disabled
                      value={formdata.email}
                      className="w-full"
                      id="outlined-basic"
                      label="Email"
                      name="email"
                      onChange={onChangePay}
                      variant="outlined"
                    />
                  </div>

                  <Button onClick={pay} className="h-10 rounded-full">
                    Make Payment
                  </Button>
                </Box>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Container>
  );
};

export default MyForm;

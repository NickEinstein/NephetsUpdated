import React from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
  Checkbox,
} from "@mui/material";

const MyForm = () => {
  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
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
          <Typography className="font-bold">Fullname</Typography>
          <TextField fullWidth />
        </div>
        <div>
          <Typography className="font-bold">Email Address</Typography>
          <TextField fullWidth />
        </div>
        <div>
          <Typography className="font-bold">Phone Number</Typography>
          <TextField fullWidth />
        </div>
        <div>
          <Typography className="font-bold">Address</Typography>
          <TextField fullWidth />
        </div>
        <div>
          <Typography className="font-bold">Date</Typography>
          <TextField fullWidth />
        </div>
        <Paper className="p-5 bg-[#F6F8FA]">
          <Typography className="font-bold mb-2 text-[18px]">
            Purpose
          </Typography>

          <div className="flex justify-between items-center rounded-lg mt-3 bg-white">
            <div className="p-3 w-full rounded-lg">
              <Typography className="font-bold">IELTS Registration</Typography>
              <Typography className="">N 30,000</Typography>
            </div>

            <Checkbox className="p-3" />
          </div>
          <div className="flex justify-between items-center rounded-lg mt-3 bg-white">
            <div className="p-3 w-full rounded-lg">
              <Typography className="font-bold">IELTS Tutorial</Typography>
              <Typography className="">N 30,000</Typography>
            </div>

            <Checkbox className="p-3" />
          </div>
          <div className="flex justify-between items-center rounded-lg mt-3 bg-white">
            <div className="p-3 w-full rounded-lg">
              <Typography className="font-bold">
                IELTS Reg/Tutorial/Materials
              </Typography>
              <Typography className="">N 30,000</Typography>
            </div>

            <Checkbox className="p-3" />
          </div>
        </Paper>

        <div>
          <Typography className="font-bold">Examination Location</Typography>
          <TextField fullWidth />
        </div>

        <Button className="h-12 px-12 w-3/12 mt-6 bg-[#A2241A]">
          Book Now
        </Button>
      </div>
    </Container>
  );
};

export default MyForm;

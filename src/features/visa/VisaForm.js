import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const VisaForm = () => {
  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    age: "" /* this */,
    lastName: "",
    phoneNumber: "",
    mailingAddress: "",
    highestLevelEducation: "",
    immigratingToCanada: "",
    children: "" /* this */,
    dependentChildren: "",
    howManyMembersHouseHold: "",
    primaryReason: "",
    currentOccupation: "",
    transcriptsEvaluated: "",
    canadianOfficialLanguage: "",
    firstLanguage: "",
    relativesOrFriendsLivingInCanada: "",
    amountOfSettlementFunds: "",
    writtenIELTS: "",
    ieltsMonthYear: "",
    provinceMigrating: "Alberta",
    aboutNephetsConsults: "",
    maritalStatus: "",
    nationality: "",
    address: "",
    country: "",
    listAllMembers: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const migratingTo = [
    { name: "Alberta", value: "Alberta" },
    { name: "British Columbia", value: "British Columbia" },
    { name: "Manitoba", value: "Manitoba" },
    { name: "New Burnswick", value: "New Burnswick" },
    { name: "Newfoundland and Labrador", value: "Newfoundland and Labrador" },
    { name: "Nova Scotia", value: "Nova Scotia" },
    { name: "Ontario", value: "Ontario" },
    { name: "Prince Edward Island", value: "Prince Edward Island" },
    { name: "Quebec", value: "Quebec" },
    { name: "Yukon", value: "Yukon" },
    { name: "Saskatchewan", value: "Saskatchewan" },
    { name: "North West Territories", value: "North West Territories" },
    { name: "Nunavut", value: "Nunavut" },
  ];

  const changeButton = (show) => {
    setShow(show);
  };

  return (
    <Container className="" maxWidth="xl">
      <div className="flex gap-12 justify-center mt-40">
        <Button
          onClick={() => changeButton(true)}
          variant="outlined"
          className={`py-4 px-12 ${show && "bg-primary-main text-white"}`}
        >
          1. Personal Information
        </Button>
        <Button
          onClick={() => changeButton(false)}
          variant="outlined"
          className={`py-4 px-12 ${!show && "bg-primary-main text-white"}`}
        >
          2. Immigration Details
        </Button>
      </div>
      {show && (
        <div className="flex flex-col gap-6 py-10 px-[25%]">
          <div className="mb-5">
            <Typography className="font-bold text-2xl text-left">
              Visa Enrollment Form
            </Typography>
            <Typography className=" text-base text-left mt-3">
              This will help us send you updates and recommendations
            </Typography>
          </div>
          <div>
            <Typography className="font-bold">Fullname</Typography>
            <TextField
              value={formData.firstName}
              onChange={handleChange} name="firstName" fullWidth />
          </div>
          <div>
            <Typography className="font-bold">Age</Typography>
            <TextField
              value={formData.age}
              onChange={handleChange} name="age" fullWidth />
          </div>
          <div>
            <Typography className="font-bold">Phone Number</Typography>
            <TextField 
              value={formData.phoneNumber}
              onChange={handleChange} name="phoneNumber" fullWidth />
          </div>
          <div>
            <Typography className="font-bold">
              Current Mailing Address
            </Typography>
            <TextField
              onChange={handleChange}
              name="address"
              value={formData.address}
              fullWidth
            />
          </div>
          <div>
            <Typography className="font-bold">Email</Typography>
            <TextField
              onChange={handleChange}
              name="mailingAddress"
              value={formData.mailingAddress}

              fullWidth
            />
          </div>
          <div>
            <Typography className="font-bold">
              Nationality (Country Of Birth)
            </Typography>
            <FormControl className="w-full" fullWidth>
              {/* <InputLabel>Select Field</InputLabel> */}
              <Select
                className="bg-white w-full"
                name="storeId"
                value={formData.storeId}
                onChange={handleChange}
              >
                {/* {stores?.map((e) => (
                      <MenuItem value={e?.id}>{e?.name}</MenuItem>
                    ))} */}
              </Select>
            </FormControl>
          </div>
          <div>
            <Typography className="font-bold">Country Of Residence</Typography>
            <FormControl className="w-full" fullWidth>
              {/* <InputLabel>Select Field</InputLabel> */}
              <Select
                className="bg-white w-full"
                name="storeId"
                value={formData.storeId}
                onChange={handleChange}
              >
                {/* {stores?.map((e) => (
                      <MenuItem value={e?.id}>{e?.name}</MenuItem>
                    ))} */}
              </Select>
            </FormControl>
          </div>
          <div>
            <Typography className="font-bold">
              {" "}
              Highest Level Of Education for you and your Partner (If
              applicable)
            </Typography>
            <FormControl className="w-full" fullWidth>
              {/* <InputLabel>Select Field</InputLabel> */}
              <Select
                className="bg-white w-full"
                name="storeId"
                value={formData.storeId}
                onChange={handleChange}
              >
                <MenuItem value={"BSC"}>{"BSC"}</MenuItem>
                <MenuItem value={"PHD"}>{"PHD"}</MenuItem>
                <MenuItem value={"MASTERS"}>{"MASTERS"}</MenuItem>
                <MenuItem value={"ND"}>{"ND"}</MenuItem>
                <MenuItem value={"HND"}>{"HND"}</MenuItem>
                <MenuItem value={"HIGH SCHOOL"}>{"HIGH SCHOOL"}</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <Typography className="font-bold">Current Occupation</Typography>
            <TextField
              onChange={handleChange}
              name="currentOccupation"
              value={formData.currentOccupation}
              fullWidth
            />
          </div>
          <Paper className="p-5 bg-[#F6F8FA]">
            <Typography className="font-bold mb-2 text-[18px]">
              Marital status
            </Typography>
            <FormControl fullWidth>
              <RadioGroup
                onChange={handleChange}
                className="w-full"
                aria-labelledby="demo-form-control-label-placement"
                name="maritalStatus"
                value={formData.maritalStatus}
                // defaultValue="End"
              >
                <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                  <Typography className="font-bold">Married</Typography>

                  <FormControlLabel
                    value="Married"
                    control={<Radio />}
                    // label="Married"
                    labelPlacement="End"
                  />
                </div>

                <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                  <Typography className="font-bold">Single</Typography>

                  <FormControlLabel
                    value="Single"
                    control={<Radio />}
                    // label="Single"
                    labelPlacement="End"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Paper>

          <div>
            <Typography className="font-bold">
              How many members of your household plan to immigrate with you
            </Typography>
            <TextField
              onChange={handleChange}
              name="howManyMembersHouseHold"
              value={formData.howManyMembersHouseHold}
              fullWidth
            />
          </div>

          <div>
            <Paper className="p-5 bg-[#F6F8FA]">
              <Typography className="font-bold">
                Do you have dependent children?
              </Typography>

              <FormControl fullWidth>
                <RadioGroup
                  onChange={handleChange}
                  className="w-full"
                  aria-labelledby="demo-form-control-label-placement"
                  name="dependentChildren"
                  value={formData.dependentChildren}
                >
                  <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                    <Typography className="font-bold">Yes</Typography>

                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      // label="Married"
                      labelPlacement="End"
                    />
                  </div>

                  <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                    <Typography className="font-bold">No</Typography>

                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      // label="Single"
                      labelPlacement="End"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </Paper>
          </div>
        </div>
      )}
      {!show && (
        <div className="flex flex-col gap-6 py-10 px-[25%]">
          <Paper className="p-5 bg-[#F6F8FA]">
            <Typography className="font-bold mb-2 text-[18px]">
              How soon are you immigrationg to Canada
            </Typography>

            <FormControl fullWidth>
              <RadioGroup
                onChange={handleChange}
                className="w-full"
                aria-labelledby="demo-form-control-label-placement"
                name="immigratingToCanada"
                defaultValue="formData.immigratingToCanada"
              >
                <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                  <Typography className="font-bold">1 - 2 Years</Typography>

                  <FormControlLabel
                    value="1-2 Years"
                    control={<Radio />}
                    // label="Married"
                    labelPlacement="End"
                  />
                </div>

                <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                  <Typography className="font-bold">1 Year</Typography>

                  <FormControlLabel
                    value="1 Year"
                    control={<Radio />}
                    // label="Single"
                    labelPlacement="End"
                  />
                </div>

                <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                  <Typography className="font-bold">6 Months</Typography>

                  <FormControlLabel
                    value="6 Months"
                    control={<Radio />}
                    // label="Single"
                    labelPlacement="End"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Paper>
          <div>
            <Typography className="font-bold">
              What is the primary reason for immigrating to canada?
            </Typography>
            <TextField onChange={handleChange} name="primaryReason" fullWidth />
          </div>
          <div>
            <Typography className="font-bold">
              Have you had your transcripts evaluated by the Canadian Evaluation
              Society
            </Typography>
            <TextField
              onChange={handleChange}
              name="transcriptsEvaluated"
              value={formData.transcriptsEvaluated}
              fullWidth
            />
          </div>
          <div>
            <Typography className="font-bold">
              What Canadian languages do you speak?
            </Typography>
            <TextField
              onChange={handleChange}
              name="canadianOfficialLanguage"
              value={formData.canadianOfficialLanguage}
              fullWidth
            />
          </div>
          <div>
            <Typography className="font-bold">
              What is your first language (Spoken Fluently)
            </Typography>
            <TextField onChange={handleChange} name="firstLanguage" fullWidth />
          </div>

          <Paper className="p-5 bg-[#F6F8FA]">
            <Typography className="font-bold mb-2 text-[18px]">
              Do you have relatives or friends living in Canada currently?
            </Typography>
            <FormControl fullWidth>
              <RadioGroup
                onChange={handleChange}
                className="w-full"
                aria-labelledby="demo-form-control-label-placement"
                name="relativesOrFriendsLivingInCanada"
                value="formData.relativesOrFriendsLivingInCanada"
              >
                <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                  <Typography className="font-bold">YES</Typography>

                  <FormControlLabel
                    value="YES"
                    control={<Radio />}
                    // label="Married"
                    labelPlacement="End"
                  />
                </div>

                <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                  <Typography className="font-bold">NO</Typography>

                  <FormControlLabel
                    value="NO"
                    control={<Radio />}
                    // label="Single"
                    labelPlacement="End"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Paper>
          <div>
            <Typography className="font-bold">Country Of Residence</Typography>
            <FormControl className="w-full" fullWidth>
              {/* <InputLabel>Select Field</InputLabel> */}
              <Select
                className="bg-white w-full"
                name="storeId"
                value={formData.storeId}
                onChange={handleChange}
              >
                {/* {stores?.map((e) => (
                      <MenuItem value={e?.id}>{e?.name}</MenuItem>
                    ))} */}
              </Select>
            </FormControl>
          </div>
          <div>
            <Typography className="font-bold">
              Kindly state amount of Settlement funds Avlable (CAN$, US$ and
              Naira)
            </Typography>
            <TextField
              onChange={handleChange}
              name="amountOfSettlementFunds"
              value={formData.amountOfSettlementFunds}
              fullWidth
            />
          </div>

          <div>
            <Typography className="font-bold">
              {" "}
              Have you written the International English Language Testing System
              (IELTS)
            </Typography>
            <FormControl className="w-full" fullWidth>
              {/* <InputLabel>Select Field</InputLabel> */}
              <Select
                className="bg-white w-full"
                name="writtenIELTS"
                value={formData.writtenIELTS}
                onChange={handleChange}
              >
                <MenuItem value={"YES"}>{"YES"}</MenuItem>
                <MenuItem value={"NO"}>{"NO"}</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <Typography className="font-bold">
              If Yes, Kindly state the (Month, Year)
            </Typography>
            <TextField
              onChange={handleChange}
              name="ieltsMonthYear"
              value={formData.ieltsMonthYear}
              fullWidth
            />
          </div>

          <div>
            <Typography className="font-bold">
              {" "}
              What province are you interested in migrating to
            </Typography>
            <FormControl className="w-full" fullWidth>
              {/* <InputLabel>Select Field</InputLabel> */}
              <Select
                className="bg-white w-full"
                name="storeId"
                value={formData.storeId}
                onChange={handleChange}
              >
                {migratingTo?.map((e) => (
                  <MenuItem value={e?.value}>{e?.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Paper className="p-5 bg-[#F6F8FA]">
            <Typography className="font-bold mb-2 text-[18px]">
              How did you hear about us
            </Typography>

            <FormControl fullWidth>
              <RadioGroup
                onChange={handleChange}
                className="w-full"
                aria-labelledby="demo-form-control-label-placement"
                name="aboutNephetsConsults"
                defaultValue="formData.aboutNephetsConsults"
              >
                <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                  <Typography className="font-bold">Social Media</Typography>

                  <FormControlLabel
                    value="Social Media"
                    control={<Radio />}
                    // label="Married"
                    labelPlacement="End"
                  />
                </div>

                <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                  <Typography className="font-bold">Referal</Typography>

                  <FormControlLabel
                    value="Referal"
                    control={<Radio />}
                    // label="Single"
                    labelPlacement="End"
                  />
                </div>

                <div className="flex justify-between items-center rounded-lg mt-3 bg-white p-2 w-full">
                  <Typography className="font-bold">Word Od Mouth</Typography>

                  <FormControlLabel
                    value="Word Od Mouth"
                    control={<Radio />}
                    // label="Single"
                    labelPlacement="End"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Paper>
        </div>
      )}
      <div className="flex gap-12 justify-between px-[25%] mt-50">
        {!show && (
          <Button className="h-12 px-20 bg-primary-main">
            {!show && "Back"}
          </Button>
        )}
        <Button
          onClick={() => changeButton(false)}
          className="h-12 px-20 bg-primary-main"
        >
          {show ? "Proceed" : "Submit"}
        </Button>
      </div>
    </Container>
  );
};

export default VisaForm;

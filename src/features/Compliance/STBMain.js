// src/App.js
import React, { useState } from "react";
// import Form from "./STBForm";
import Table from "./STBTable";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import edologo from "images/EdoLogo.svg";
import edologo2 from "images/Screenshot 2023-11-06 at 12.34 1.svg";
import useAuthUser from "hooks/useAuthUser";

const STBMain = (props) => {
  const user = useAuthUser();
  const [tableData, setTableData] = useState([]);
  const [stbArray, setStbArray] = useState([]);
  const [formData, setFormData] = useState({ description: "", decision: "" });
  const [fromDate, setfromDate] = React.useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (formData) => {
    console.log(formData);
    setTableData([...tableData, formData]);
    setFormData({
      description: "",
      decision: "",
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(formData);
    // const pp = [
    //   {
    //     id: 0,
    //     memoRequestId: 0,
    //     sittingDate: "2024-01-11T14:47:05.325Z",
    //     description: "string",
    //     decision: "string",
    //     referenceNumber: "string",
    //   },
    // ];
    setStbArray([
      ...stbArray,
      {
        // id: 0,
        memoRequestId: props?.procurements?.id || 0,
        sittingDate: fromDate,
        description: formData?.description,
        decision: formData?.decision,
        referenceNumber: props?.procurements?.requisitionId || "",
      },
    ]);
    props.stbData([
      ...stbArray,
      {
        // id: 0,
        memoRequestId: props?.procurements?.id || 0,
        sittingDate: fromDate,
        description: formData?.description,
        decision: formData?.decision,
        referenceNumber: props?.procurements?.requisitionId || "",
      },
    ]);

    setFormData({ ...formData, description: "", decision: "" });

    // handleFormSubmit(formData);
    // setFormData({ name: '', age: '', email: '' });
  };

  return (
    <div className="container mx-auto p-4 w-full px-[10%]">
      <div className="flex flex-col gap-3 w-full items-center mb-8">
        <Avatar className="w-16 h-16" src={edologo} />
        <Typography variant="h4" className="font-bold text-center">
          STATE TENDERS BOARD
        </Typography>
        <Typography className="font-bold">
          Email: stb@Edostate.gov.ng
        </Typography>
      </div>

      <div className="flex gap-2 items-end mb-4 justify-center">
        <Typography>I wish to inform you that on the sitting of </Typography>
        <DatePicker
          label="Sitting Date"
          // toolbarPlaceholder="ji"
          // disableFuture
          className="w-[200px]"
          value={fromDate}
          onChange={(newValue) => {
            console.log(newValue);
            setfromDate(newValue);
          }}
          renderInput={(params) => (
            <TextField
              variant="standard"
              size="small"
              margin="dense"
              {...params}
            />
          )}
        />
        <Typography>
          The state board considers your request Approved/ or Advised as detiled
          below.{" "}
        </Typography>
      </div>

      <Typography variant="h5" className="font-bold text-center my-8">
        Request For Approval
      </Typography>

      <div className="flex gap-3 items-start">
        <TextField
          className="w-1/2"
          onChange={handleChange}
          label="Description"
          name="description"
          value={formData?.description}
        />
        <TextField
          className="w-1/2"
          onChange={handleChange}
          multiline
          rows={5}
          label="Decision"
          name="decision"
          value={formData?.decision}
        />

        <Button className="w-[200px] p-3" onClick={handleSubmit}>
          Add to Table
        </Button>
      </div>
      {/* <Form onSubmit={handleFormSubmit} /> */}
      <Table data={stbArray} />

      <Typography className="mt-5">
        Consequently you are required to ensure compliance with the relevant
        provisions of Edo state Public Procurement (Repeal & Reenactment) Law
        2020 before issuance of appropriate notice to the contractors(s)
      </Typography>

      <Typography>
        Kindly accept the assurances of the Chairman's highest regard, Please.
      </Typography>

      <div className="mt-5">
        <Typography className="font-bold">{user?.fullName}</Typography>
      </div>

      {/* {tableData?.length > 0 && (
        // <Button className="p-3 px-16 mt-5">Approve</Button>
      )} */}
    </div>
  );
};

export default STBMain;

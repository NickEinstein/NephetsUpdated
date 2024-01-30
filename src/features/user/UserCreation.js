import React from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card, Typography } from "@mui/material";

const UserCreation = () => {
  const [formData, setFormData] = React.useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    selectField: "",
  });

  const data = [
    {
      id: 1,
      column1: "Value 1",
      column2: "Value 2",
      column3: "Value 3",
      column4: "Value 4",
      column5: "Value 5",
      column6: "Value 5",
    },
    {
      id: 2,
      column1: "Value 6",
      column2: "Value 7",
      column3: "Value 8",
      column4: "Value 9",
      column5: "Value 10",
      column6: "Value 5",
    },
    // Add more data as needed
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
  };

  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h4">
        User Creation
      </Typography>
      <div className=" gap-6">
        <Card className="px-8 py-4 w-full bg-black text-white rounded-2xl">
          <form className="flex flex-col gap-4  px-10" onSubmit={handleSubmit}>
            <div className="w-full mb-6 flex flex-col gap-4">
              <div className="w-full mt-6">
                <Typography>Approved ccount Creation Ticket No.</Typography>
                <TextField
                  className="bg-white rounded-full"
                  // label="Field 6"
                  name="field6"
                  // value={formData.field6}
                //   onChange={handleChange}
                  fullWidth
                />
              </div>
              <div className="flex gap-6">
                <div className="w-full ">
                  <Typography>Firstname</Typography>
                  <TextField
                    className="bg-white rounded-full"
                    // label="Field 6"
                    // name="field6"
                    // value={formData.field6}
                    // onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-full">
                  <Typography>Lastname</Typography>
                  <TextField
                    className="bg-white rounded-full"
                    // label="Field 6"
                    // name="field6"
                    // value={formData.field6}
                    // onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-full ">
                  <Typography>Staff ID</Typography>
                  <TextField
                    className="bg-white rounded-full"
                    // label="Field 6"
                    // name="field6"
                    // value={formData.field6}
                    // onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-full">
                <Typography>Department</Typography>
                  <FormControl className="w-full" fullWidth>
                    <InputLabel>Select Field</InputLabel>
                    <Select
                      className='bg-white w-full'
                      name="selectField"
                      value={formData.selectField}
                    //   onChange={handleChange}
                    >
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                  </FormControl>
              </div>
              </div>
              <div className="flex gap-6">
                <div className="w-full ">
                  <Typography>Location</Typography>
                  <TextField
                    className="bg-white rounded-full"
                    // label="Field 6"
                    // name="field6"
                    // value={formData.field6}
                    // onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-full">
                <Typography>Undertaking</Typography>
                  <FormControl fullWidth>
                    <InputLabel>Select Field</InputLabel>
                    <Select
                      className='bg-white'
                    //   name="selectField"
                    //   value={formData.selectField}
                    //   onChange={handleChange}
                    >
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                  </FormControl>
              </div>
              </div>
              <div className="flex gap-6">
                <div className="w-full ">
                  <Typography>Mobile</Typography>
                  <TextField
                    className="bg-white rounded-full"
                    // label="Field 6"
                    name="field6"
                    value={formData.field6}
                    // onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-full">
                  <Typography>Email</Typography>
                  <TextField
                    className="bg-white rounded-full"
                    // label="Field 6"
                    // name="field6"
                    // value={formData.field6}
                    // onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-full ">
                  <Typography>Username</Typography>
                  <TextField
                    className="bg-white rounded-full"
                    // label="Field 6"
                    // name="field6"
                    // value={formData.field6}
                    // onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-full">
                <Typography>Primary Role</Typography>
                  <FormControl fullWidth>
                    <InputLabel>Select Field</InputLabel>
                    <Select
                      className='bg-white'
                      name="selectField"
                    //   value={formData.selectField}
                    //   onChange={handleChange}
                    >
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                  </FormControl>
              </div>
              </div>
            </div>

            <div className="flex gap-3 w-full justify-start mt-5">
              <Button
                className="bg-[#2BDF27]"
                type="submit"
                variant="contained"
                color="primary"
              >
                Process
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UserCreation;

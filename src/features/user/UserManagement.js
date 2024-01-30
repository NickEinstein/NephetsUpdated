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
import { Card, Checkbox, Typography } from "@mui/material";

const UserManagement = () => {
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
      column1: <Checkbox />,
      column2: "Value 2",
      column3: "Value 3",
      column4: "Value 4",
      column5: "Value 5",
      column6: "Value 5",
      column7: "Value 5",
      column8: <Button className="bg-[#2BDF27]">Releases</Button>,
    },
    {
      id: 2,
      column1: <Checkbox />,
      column2: "Value 7",
      column3: "Value 8",
      column4: "Value 9",
      column5: "Value 10",
      column6: "Value 5",
      column7: "Value 5",
      column8: <Button className="bg-[#2BDF27]">Releases</Button>,
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
      <Typography className="text-center font-bold my-5 " variant="h4">
        User Management
      </Typography>
      <div className="flex flex-col gap-6 items-start">
        <Card
          //   title=""
          className="px-8 py-4 w-full bg-black rounded-2xl flex flex-col gap-6 items-start text-white"
        >
          <div className="flex items-center">
            {/* <Button>Csv</Button> */}
            <Button>Excel</Button>
            <Button className="ml-4">PDF</Button>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold text-base">#</TableCell>
                  <TableCell className="font-bold text-base">Code</TableCell>
                  <TableCell className="font-bold text-base">Name</TableCell>
                  <TableCell className="font-bold text-base">
                    Username by
                  </TableCell>
                  <TableCell className="font-bold text-base">Email</TableCell>
                  <TableCell className="font-bold text-base">Mobile</TableCell>
                  <TableCell className="font-bold text-base">
                    Location
                  </TableCell>
                  <TableCell className="font-bold text-base">Roles</TableCell>
                  <TableCell className="font-bold text-base">Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    {/* <TableCell>{row.column1}</TableCell>
                    <TableCell>{row.column2}</TableCell>
                    <TableCell>{row.column3}</TableCell>
                    <TableCell>{row.column4}</TableCell>
                    <TableCell>{row.column5}</TableCell>
                    <TableCell>{row.column6}</TableCell>
                    <TableCell>{row.column7}</TableCell>
                    <TableCell>{row.column7}</TableCell>
                    <TableCell>{row.column7}</TableCell>
                    <TableCell>{row.column8}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex items-center mt-12 self-end">
            <Button>First</Button>
            <Button>Prev</Button>
            <Button>Next</Button>
            <Button>Last</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;

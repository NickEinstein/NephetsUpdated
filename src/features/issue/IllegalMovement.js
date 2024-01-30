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

const IllegalMovement = () => {
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
        Illegal Movement Chart
      </Typography>
      <div className="flex flex-col gap-6 items-start">
        <Card
          title=""
          className="px-8 py-4 w-full bg-black rounded-2xl flex flex-col gap-6 items-start text-white"
        >
          <div className="w-full gap-8 flex items-center">
            <div className="  ">
              <Typography>From</Typography>

              <TextField className="bg-white" />
            </div>
            <div className="  ">
              <Typography>To</Typography>

              <TextField className="bg-white" />
            </div>
            <div className="  ">
              <Typography>Tag Code</Typography>

              <TextField className="bg-white" />
            </div>

            <div>
              <Typography className="text-black">Tag Code</Typography>

              <Button className="bg-[#1B9EDE] text-white flex">Show</Button>
            </div>
          </div>

          <div className="flex items-center">
            {/* <Button>Csv</Button> */}
            <Button>Excel</Button>
            <Button className="ml-4">PDF</Button>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold">Code</TableCell>
                  <TableCell className="font-bold">Remark</TableCell>
                  <TableCell className="font-bold">Request by</TableCell>
                  <TableCell className="font-bold">Date</TableCell>
                  <TableCell className="font-bold">
                    Releasing Warehouse
                  </TableCell>
                  <TableCell className="font-bold">Total Items</TableCell>
                  <TableCell className="font-bold">Total Quantity</TableCell>
                  <TableCell className="font-bold"></TableCell>
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

export default IllegalMovement;

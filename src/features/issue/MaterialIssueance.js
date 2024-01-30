import React from "react";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card, Checkbox, Typography } from "@mui/material";
import ReqApi from "apis/ReqApi";

const MaterialIssueance = () => {
  const getProcessedApprovalRequestQueryResult =
    ReqApi.useGetProcessedApprovalRequestQuery({});
  const ProcessedApprovalRequestResult =
    getProcessedApprovalRequestQueryResult?.data;
    const [clear, setclear] = React.useState(null)
    const [clear1, setclear1] = React.useState(null)
    const [clear2, setclear2] = React.useState(null)
    const [clear3, setclear3]= React.useState(null)
    const [clear4, setclear4] = React.useState(null)
    const [clear5, setclear5] = React.useState(null)

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
      <Typography className="text-center font-bold my-5" variant="h4">
        Material issueance
      </Typography>
      <div className="flex flex-col gap-6 items-start">
        <Card
          title=""
          className="px-8 py-4 w-full bg-black rounded-2xl flex flex-col gap-6 items-start"
        >
          <Button className="bg-red-500 text-white flex">
            Delete Selected Items
          </Button>

          <div className="flex items-center">
            {/* <Button>Csv</Button> */}
            <Button>Excel</Button>
            <Button className="ml-4">PDF</Button>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Remark</TableCell>
                  <TableCell>Request by</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Releasing Warehouse</TableCell>
                  <TableCell>Total Items</TableCell>
                  <TableCell>Total Quantity</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.column1}</TableCell>
                    <TableCell>{row.column2}</TableCell>
                    <TableCell>{row.column3}</TableCell>
                    <TableCell>{row.column4}</TableCell>
                    <TableCell>{row.column5}</TableCell>
                    <TableCell>{row.column6}</TableCell>
                    <TableCell>{row.column7}</TableCell>
                    <TableCell>{row.column8}</TableCell>
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

export default MaterialIssueance;

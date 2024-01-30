import React, { useState } from "react";
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
import { useSnackbar } from "notistack";
import UserApi from "apis/UserApi";
import ReportsApi from "apis/ReportsApi";
import RackApi from "apis/RackApi";
import moment from "moment";
import StockApi from "apis/StockApi";

const IntakesLog = () => {
  //   const [projectId, setProjectId] = useState(1);
  const [RackId, setRackId] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = React.useState({
    store: 1,
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    selectField: "",
  });

  const getStoreSKUResult = ReportsApi.useGetReceivingLogQuery({
    RackId: formData.store,
    // Location,
  });
  const storeSKU = getStoreSKUResult.data;

  const getIntakesResult = StockApi.useGetIntakesQuery({
    // RackId: formData.store,
    // Location,
  });
  const intakes = getIntakesResult.data;

  const compareDatetime = (a, b) => new Date(b.date_In) - new Date(a.date_In);

  // Sort the array by datetime
  const sortedData = storeSKU?.slice()?.sort(compareDatetime);
  console.log(sortedData);

  const getStoreResult = RackApi.useGetRackQuery({
    //   ProjectType,
    //   Location,
  });
  const productStore = getStoreResult?.data;

  //   const globalBin = getGlobalBinResult?.data;

  const data = [
    {
      id: 1,
      column1: "#",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    },
    {
      id: 2,
      column1: <Checkbox />,
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    },
    // Add more data as needed
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRackId(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
  };
  // Intakes
  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h3">
        Receiving Log
      </Typography>
      <div className="flex flex-col gap-6 items-start">
        <Card
          title=""
          className="px-8 py-4 w-full bg-black rounded-2xl flex flex-col gap-6 items-start"
        >
          <div className="flex justify-between gap-8  w-full">
            <div className="w-full">
              <Typography className="text-white mb-2 ml-3 w-full">
                Select Rack
              </Typography>
              <FormControl className="w-full" fullWidth>
                {/* <InputLabel>Select Field</InputLabel> */}
                <Select
                  className="bg-white w-full"
                  name="store"
                  value={formData.store}
                  onChange={handleChange}
                >
                  {productStore?.map((e) => (
                    <MenuItem value={e?.id}>{e?.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="flex items-center">
            <Button>Csv</Button>
            <Button>Excel</Button>
            <Button className="ml-4">PDF</Button>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="font-bold">
                  <TableCell className="font-bold text-base">#</TableCell>
                  <TableCell className="font-bold text-base">Product</TableCell>
                  <TableCell className="font-bold text-base">
                    Quantity
                  </TableCell>

                  <TableCell className="font-bold text-base">Date In</TableCell>
                  <TableCell className="font-bold text-base">
                    Receiver
                  </TableCell>

                  {/* <TableCell className="font-bold text-base">
                    Reorder Level
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData?.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{moment(row.date_In).format("LL")}</TableCell>
                    <TableCell>{row.userName}</TableCell>

                    {/* <TableCell>{row.reOrderLevel}</TableCell> */}
                    {/* <TableCell>{row.column6}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <div className="flex items-center mt-12 self-end">
            <Button>First</Button>
            <Button>Prev</Button>
            <Button>Next</Button>
            <Button>Last</Button>
          </div> */}
        </Card>
      </div>
    </div>
  );
};

export default IntakesLog;

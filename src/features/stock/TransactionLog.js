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
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import ExportToExcel from "features/dashboard/ExportToExcel";

const TransactionLog = () => {
  //   const [projectId, setProjectId] = useState(1);
  const [productId, setProductId] = useState(1);
  const [From, setFrom] = useState();
  const [To, setTo] = useState();
  const [filter, setFilter] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = React.useState({
    store: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    selectField: "",
  });

  const getStoreSKUResult = ReportsApi.useGetTransactionLogsQuery({
    // Location,
    From,
    To,
    filter,
  });
  const storeSKU = getStoreSKUResult.data;

  const getStoreResult = UserApi.useGetStoreQuery({
    //   ProjectType,
    //   Location,
  });
  const productStore = getStoreResult?.data;

  //   const globalBin = getGlobalBinResult?.data;

  const header = ["#", "User", "Date", "Activity"];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductId(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let dataz = storeSKU?.map((e) => ({
    user: e?.username,
    date: moment(e?.date).format("ll"),
    activity: e?.activity,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
  };

  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h3">
        Transaction Logs
      </Typography>
      <div className="flex flex-col gap-6 items-start">
        <Card
          title=""
          className="px-8 py-4 w-full bg-black rounded-2xl flex flex-col gap-6 items-start"
        >
          <div class="flex justify-between items-center w-full">
            <div className="flex items-center">
              {/* <Button>Csv</Button> */}
              <ExportToExcel data={dataz} header={header} />
              <Button className="ml-4">PDF</Button>
            </div>
            <div class="flex gap-6">
              <DatePicker
                // label='Select Date'
                toolbarPlaceholder="ji"
                disableFuture
                value={From}
                onChange={(newValue) => {
                  console.log(newValue);
                  setFrom(newValue);
                }}
                renderInput={(params) => (
                  <TextField size="small" margin="dense" {...params} />
                )}
              />
              <DatePicker
                // label='Select Date'
                toolbarPlaceholder="ji"
                disablePast
                value={To}
                onChange={(newValue) => {
                  setTo(newValue);
                }}
                renderInput={(params) => (
                  <TextField size="small" margin="dense" {...params} />
                )}
              />
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="font-bold">
                  <TableCell className="font-bold text-base">#</TableCell>
                  <TableCell className="font-bold text-base">User</TableCell>

                  <TableCell className="font-bold text-base">Date</TableCell>
                  <TableCell className="font-bold text-base">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storeSKU?.map((row, idx) => (
                  <TableRow
                    key={row.id}
                    className={
                      row.balance <= row.reOrderLevel &&
                      "bg-red-300 animate-pulse"
                    }
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{row.username}</TableCell>

                    <TableCell>
                      {moment(row.date).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{row.activity}</TableCell>
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

export default TransactionLog;

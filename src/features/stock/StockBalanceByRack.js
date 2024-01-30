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
import { Card, Checkbox, TablePagination, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import UserApi from "apis/UserApi";
import ReportsApi from "apis/ReportsApi";
import RackApi from "apis/RackApi";
import ExportToExcel from "features/dashboard/ExportToExcel";
import moment from "moment";

const StockBalanceRack = () => {
  //   const [projectId, setProjectId] = useState(1);
  const [RackId, setRackId] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const [searchitemHolder, setsearchitemHolder] = React.useState([]);
  const [searchitemText, setsearchitemText] = React.useState("");

  const [formData, setFormData] = React.useState({
    store: 1,
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    selectField: "",
  });

  const header = [
    "#",
    "Code",
    "Item Detail",
    "Balance",
    // "Status",
    "Category",
    "Reorder Level",
    // "Created By",
  ];

  const getStoreSKUResult = ReportsApi.useGetRackBalanceQuery({
    RackId: formData.store,
    // Location,
  });
  const storeSKU = getStoreSKUResult.data;

  const getStoreResult = RackApi.useGetRackQuery({
    //   ProjectType,
    //   Location,
  });
  const productStore = getStoreResult?.data;

  //   const globalBin = getGlobalBinResult?.data;

  function filterListByArray(text) {
    // return originalList.filter(item =>
    setsearchitemText(text);
    console.log(text);
    let pp = storeSKU?.filter(
      (array) =>
        array?.name?.toLowerCase()?.includes(text?.toLowerCase()) ||
        array?.code?.toLowerCase()?.includes(text?.toLowerCase())
    );

    console.log(pp);

    setsearchitemHolder(pp);
    // );
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ... (other code remains unchanged)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h3">
        Stock Balance By Rack
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

          <div class="flex justify-between w-full">
            <div className="flex items-center">
              {/* <Button>Csv</Button> */}
              {/* <Button>Excel</Button> */}
              <ExportToExcel data={storeSKU} header={header} />
              <Button className="ml-4">PDF</Button>
            </div>
            <TextField
              placeholder="Search table"
              className=""
              onChange={(e) => filterListByArray(e.target.value)}
            />
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="font-bold">
                  <TableCell className="font-bold text-base">#</TableCell>
                  <TableCell className="font-bold text-base">Code</TableCell>
                  <TableCell className="font-bold text-base">
                    Item Detail
                  </TableCell>

                  <TableCell className="font-bold text-base">Balance</TableCell>
                  <TableCell className="font-bold text-base">
                    Category
                  </TableCell>

                  <TableCell className="font-bold text-base">
                    Reorder Level
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(searchitemText.length > 0 ? searchitemHolder : storeSKU)
                  ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  ?.map((row, idx) => (
                    // )?.map((row, idx) => (
                    <TableRow key={row.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.balance}</TableCell>
                      <TableCell>{row.category}</TableCell>

                      <TableCell>{row.reOrderLevel}</TableCell>
                      {/* <TableCell>{row.column6}</TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div class="bg-white w-full">
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={
                (searchitemText.length > 0 ? searchitemHolder : storeSKU)
                  ?.length
              }
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>

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

export default StockBalanceRack;

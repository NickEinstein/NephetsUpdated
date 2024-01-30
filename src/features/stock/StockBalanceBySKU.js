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
import ExportToExcel from "features/dashboard/ExportToExcel";

const StockBalanceSKU = () => {
  //   const [projectId, setProjectId] = useState(1);
  const [productId, setProductId] = useState(1);
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

  const getStoreSKUResult = ReportsApi.useGetSkuStocksQuery({
    productId: formData.store,
    // Location,
  });
  const storeSKU = getStoreSKUResult.data;

  const getStoreResult = UserApi.useGetStoreQuery({
    //   ProjectType,
    //   Location,
  });
  const productStore = getStoreResult?.data;

  //   const globalBin = getGlobalBinResult?.data;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductId(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
  };

  const header = [
    "#",
    "Code",
    "Item Detail",
    "Quantity",
    // "Status",
    "Store",
    "Date Created",
    "Created By",
  ];

  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h3">
        Stock Balance By SKU
      </Typography>
      <div className="flex flex-col gap-6 items-start">
        <Card
          title=""
          className="px-8 py-4 w-full bg-black rounded-2xl flex flex-col gap-6 items-start"
        >
          <div className="flex justify-between gap-8  w-full">
            <div className="w-full">
              <Typography className="text-white mb-2 ml-3 w-full">
                Select Store
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
              // onChange={(e) => filterListByArray(e.target.value)}
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

                  <TableCell className="font-bold text-base">
                    Quantity
                  </TableCell>
                  {/* <TableCell className="font-bold text-base">Tag</TableCell> */}
                  {/* <TableCell className="font-bold text-base">Status</TableCell> */}
                  <TableCell className="font-bold text-base">Store</TableCell>
                  <TableCell className="font-bold text-base">
                    Date Created
                  </TableCell>
                  <TableCell className="font-bold text-base">
                    Created By
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storeSKU?.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    {/* <TableCell>{row.tag}</TableCell> */}
                    {/* <TableCell>{row.status}</TableCell> */}
                    <TableCell>{row.store}</TableCell>
                    <TableCell>
                      {moment(row.dateCreated).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{row.userName}</TableCell>
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

export default StockBalanceSKU;

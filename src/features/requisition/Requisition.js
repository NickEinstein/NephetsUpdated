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
import { Autocomplete, Card, Divider, Typography } from "@mui/material";
import UserApi from "apis/UserApi";
import UsersApi from "apis/UsersApi";
import StockApi from "apis/StockApi";
import ReqApi from "apis/ReqApi";
import { useSnackbar } from "notistack";
import ReportsApi from "apis/ReportsApi";
import useAuthUser from "hooks/useAuthUser";

const StockRequisition = () => {
  const [formData, setFormData] = React.useState({
    quantity: "",
    message: "",
    userId: 22,
    requestType: "",
    code: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const authUser = useAuthUser();

  const [TaggingId, setTaggingId] = React.useState();
  const [items, setItems] = React.useState([]);
  const [dump, setDump] = React.useState(null);
  const [dump3, setDump3] = React.useState(null);
  const [dump4, setDump4] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(false);

  // StoreStocks

  const getLocationsQueryResult = UserApi.useGetStoreLocationsQuery({});
  const locations = getLocationsQueryResult?.data;

  const getProductsQuery = UserApi.useGetStoreProductsQuery({ TaggingId });
  const products = getProductsQuery?.data;

  const getUsersQuery = UsersApi.useGetUserQuery({ id: authUser.locationId });
  const Users = getUsersQuery?.data;

  const [stockRequestMuation, stockRequestMuationResult] =
    ReqApi.useRequestMutation();

  const getStoreStocksQueryResult = ReportsApi.useGetProductBalancesQuery({
    TaggingId,
  });
  const storeStockInStore = getStoreStocksQueryResult?.data;

  const [receiveStockMuation, receiveStockMutationResult] =
    UserApi.useReceiveStockMutation();

  const data = [
    {
      id: 1,
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    },
    {
      id: 2,
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
    },
    // Add more data as needed
  ];

  const requestTypes = [
    { name: "SRIN", description: "Material Utilisation Request (SRIN)", id: 0 },
    {
      name: "SRCNHQBU",
      description: "Material Transfer from HQ to Business Unit (SRCNHQBU)",
      id: 1,
    },
    // { name: "Return", description: "Return", id: 10 },
    // Add more data entries here
  ];

  const postOutbound = async () => {
    // alert('kk')
    let payload = {
      maintenanceCode: "string",
      receiver: formData.userId,
      message: formData.message,
      reqType: formData.requestType,
      projectTypeId: 1,
      priority: 1,
      projectId: 1,
      materials: items,
    };

    console.log(payload);
    setisLoading(true);

    try {
      const data = await stockRequestMuation({ data: payload }).unwrap();
      // TODO extra login
      // console.log(data.data);
      enqueueSnackbar("Request sent", { variant: "success" });
      setFormData({ quantity: "", message: "", userId: "", requestType: "" });
      setItems([]);
      setDump3(null);
      setDump4(null);

      setisLoading(false);

      // setRefreshD((orev)=>orev+1)
      // redirect();
    } catch (error) {
      console.log(error);

      enqueueSnackbar(error?.data, "Failed to login", {
        variant: "error",
      });
      setisLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  let id = 0;
  const addItem = () => {
    id = id + 1;
    let payload = {
      id: items.length + 1,
      code: formData.code,
      quantity: formData.quantity,
      productName: products.find((e) => e.code === formData.code)?.name,
    };

    let cow = [];
    cow = [...cow, payload];

    setItems([...items, payload]);

    setFormData({ ...formData, code: "", quantity: "" });
    setDump(null);
  };
  console.log(items);

  const removeItem = (toremove) => {
    const remove = items.filter((item) => item.id !== toremove.id);

    setItems(remove);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
  };

  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h4">
        Stock Requisitions
      </Typography>
      <div className="flex gap-6">
        <Card title="" className="px-8 py-4 w-full bg-black rounded-2xl">
          <div className="w-full flex gap-5 items-center">
            {
              <div className="w-full">
                <Typography className="text-white mb-2 ml-3 w-full">
                  Select Receiver
                </Typography>
                <FormControl className="w-full" fullWidth>
                  {/* <TextField
                          className="bg-white rounded-full"
                          // label="Field 1"
                          name="userId"
                          value={formData.userId}
                          onChange={handleChange}
                          fullWidth
                          placeholder="Click to input receiver"
                        /> */}
                  {/* <InputLabel>Select Field</InputLabel> */}
                  <Autocomplete
                    className="m-2"
                    value={dump3}
                    disablePortal
                    onChange={
                      (event, newValue) =>
                        // handleChange(event, newValue)
                        {
                          setFormData({ ...formData, userId: newValue?.id });
                          setDump3(newValue);
                        }
                      // console.log(newValue)
                    }
                    // id="combo-box-demo"
                    options={(Users || [])?.map((e) => ({
                      label: e?.description,
                      id: e?.description,
                    }))}
                    sx={{ minWidth: 200 }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
              </div>
            }
            <div className="w-full">
              <Typography className="text-white mb-2 ml-3 w-full">
                Select Request Type
              </Typography>
              <FormControl className="w-full" fullWidth>
                <Autocomplete
                  value={dump4}
                  className="m-2"
                  disablePortal
                  onChange={
                    (event, newValue) =>
                      // handleChange(event, newValue)
                      {
                        setFormData({ ...formData, requestType: newValue?.id });
                        setDump4(newValue);
                      }
                    // console.log(newValue)
                  }
                  // id="combo-box-demo"
                  options={(requestTypes || [])?.map((e) => ({
                    label: e?.description,
                    id: e?.id,
                  }))}
                  sx={{ minWidth: 200 }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </div>
          </div>
          <FormControl className="w-full" fullWidth>
            {/* <InputLabel>Select Field</InputLabel> */}
            <TextField
              className="bg-white rounded-full mt-4"
              // label="Field 1"
              multiline
              rows={3}
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              placeholder="Input message"
            />
          </FormControl>
          <Divider className="border text-white bg-white my-8" />

          <div className="flex gap-8 mt-6">
            <div className="w-full">
              <div className="mb-5">
                <Typography
                  variant="h4"
                  className="font-bold text-white text-center mb-6"
                >
                  ADD ITEMS
                </Typography>
                <div className="flex gap-6">
                  <div className="flex justify-between gap-8 w-1/2">
                    <div className="w-full">
                      <Typography className="text-white mb-2 ml-3 w-full">
                        Select Product
                      </Typography>
                      <FormControl className="w-full" fullWidth>
                        <Autocomplete
                          value={dump}
                          className="m-2"
                          disablePortal
                          onChange={(event, newValue) =>
                            // handleChange(event, newValue)
                            {
                              setFormData({ ...formData, code: newValue?.id });
                              // console.log(newValue)
                              setDump(newValue);
                            }
                          }
                          // id="combo-box-demo"
                          options={(storeStockInStore || [])?.map((e) => ({
                            label: e?.product,
                            id: e?.code,
                          }))}
                          sx={{ minWidth: 200 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="flex justify-between gap-8  w-1/2">
                    <div className="w-full">
                      <Typography className="text-white mb-2 ml-3 w-full">
                        Quantity
                      </Typography>
                      <FormControl className="w-full" fullWidth>
                        {/* <InputLabel>Select Field</InputLabel> */}
                        <TextField
                          className="bg-white rounded-full"
                          // label="Field 1"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          fullWidth
                          placeholder="Click to input Quantity"
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
                <Button className="mt-4" onClick={addItem}>
                  Add
                </Button>
              </div>

              <Typography
                className="text-center font-bold my-5 text-white"
                variant="h5"
              >
                Item Details
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-bold text-base">#</TableCell>
                      <TableCell className="font-bold text-base">
                        Product
                      </TableCell>
                      <TableCell className="font-bold text-base">
                        Product Code
                      </TableCell>
                      <TableCell className="font-bold text-base">
                        Quantity
                      </TableCell>
                      <TableCell className="font-bold text-base">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items?.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{row.productName}</TableCell>
                        <TableCell>{row.code}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell
                          onClick={() => removeItem(row)}
                          className="text-red-400 cursor-pointer"
                        >
                          Remove
                        </TableCell>
                      </TableRow>
                      // <div></div>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          <Button
            // type="submit"
            variant="contained"
            // color="primary"
            className="p-3 w-full bg-[#2BDF27] flex justify-center gap-9 items-center text-base my-6"
            onClick={postOutbound}
            // onClick={() => localStorage.setItem('type', 'CLIENT')}
            // className=' '
          >
            {isLoading && (
              <div class="flex items-center justify-center">
                <div class="border-t-4 border-white border-solid rounded-full animate-spin h-4 w-4"></div>
              </div>
            )}
            Confirm Requisition
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default StockRequisition;

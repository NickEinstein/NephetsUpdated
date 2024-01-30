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
import { Autocomplete, Card, Typography } from "@mui/material";
import UserApi from "apis/UserApi";
import StockApi from "apis/StockApi";
import RackApi from "apis/RackApi";
import { useSnackbar } from "notistack";
import ReportsApi from "apis/ReportsApi";
import moment from "moment";
import DeliveryApi from "apis/DeliveryApi";
import { useNavigate } from "react-router-dom";
import StoreApi from "apis/StoreApi";
import ReqApi from "apis/ReqApi";
import { ArrowBackTwoTone } from "@mui/icons-material";

const StockIntake = () => {
  const [formData, setFormData] = React.useState({
    rack: "",
    // rackId:'',
    shelfCode: "",
    shelfCode1: "",
    productBarcode: "",
    quantity: 0,
  });
  const { enqueueSnackbar } = useSnackbar();

  const [TaggingId, setTaggingId] = React.useState();
  const [RequestCode, setRequestCode] = React.useState();
  const [requestObj, setrequestObj] = React.useState();
  const [show, setShow] = React.useState(false);

  const redirect = useNavigate();

  // StoreStocks
  const getRacksQueryResult = RackApi.useGetRackQuery({});
  const rack = getRacksQueryResult?.data;

  const [stockConfirmReleaseMuation, stockConfirmReleaseMutationResult] =
    StockApi.useStockTransferIntakeMutation();

  const getShelvesByRackQueryResult = RackApi.useGetShelvesByRackIdQuery({
    id: formData.rack,
  });
  const shelvesByRack = getShelvesByRackQueryResult?.data;

  const getShelvesQueryResult = RackApi.useGetShelvesQuery({});
  const shelves = getShelvesQueryResult?.data;

  const getProductsQuery = UserApi.useGetStoreProductsQuery({ TaggingId });
  const products = getProductsQuery?.data;

  const getAllDeliveryQuery = DeliveryApi.useGetAllDeliveriesQuery();
  const allDeliveries = getAllDeliveryQuery.data;

  const [stockIntakeMuation, stockIntakeMutationResult] =
    StockApi.useStockIntakeMutation();

  const getStoreStocksQueryResult = UserApi.useGetStoreStocksQuery({
    TaggingId,
  });
  const getRequestsQueryResult = ReqApi.useGetRequestQuery({
    TaggingId,
  });
  const requests = getRequestsQueryResult?.data;

  const getRequestsDetailsQueryResult = ReqApi.useGetReleasedStocksQuery({
    RequestCode,
  });
  const requestsDetails = getRequestsDetailsQueryResult?.data;

  const storeStockInStore = getStoreStocksQueryResult?.data;

  const getProductsInStoresResult = ReportsApi.useGetProductBalancesQuery({});
  const productsInStore = getProductsInStoresResult?.data;

  const getStoreQueryResult = StoreApi.useGetStoresQuery({});
  const stores = getStoreQueryResult?.data;

  // const getStoresQueryResult = StoreApi.useGetStoresQuery({});
  // const stores = getStoresQueryResult?.data;

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

  const dataApproval = [
    { store: "Store A", dateCreated: "2023-01-15", items: 50 },
    { store: "Store B", dateCreated: "2023-02-10", items: 30 },
    { store: "Store C", dateCreated: "2023-03-05", items: 70 },
    // Add more data entries here
  ];

  const postIntake = async () => {
    let payload = {
      shelfCode: formData.shelfCode,
      productBarcode: products?.find(
        (prod) => prod?.id === formData.productBarcode
      )?.barcode,
      quantity: +formData.quantity,
    };

    console.log(payload);
    try {
      const data = await stockIntakeMuation({ data: payload }).unwrap();
      // TODO extra login
      // console.log(data.data);
      enqueueSnackbar("successful", { variant: "success" });
      // setRefreshD((orev)=>orev+1)
      redirect("/receiving-log");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.data, "Failed to login", {
        variant: "error",
      });
    }
  };

  const postOutbound = async (RequestCode) => {
    // let payload = {
    //   requestId: RequestCode,
    // };
    let payload = {
      requestCode: RequestCode,
      stockItems: [...requestsDetails?.map((e) => e.id)],
      shelfCode: formData?.shelfCode1,
    };

    console.log(payload);
    try {
      const data = await stockConfirmReleaseMuation({ data: payload }).unwrap();
      // TODO extra login
      // console.log(data.data);
      setTaggingId((prev) => prev + 1);
      enqueueSnackbar("Release Confirmed Successfully", { variant: "success" });
      // setRefreshD((orev)=>orev+1)
      // redirect();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.data, "Failed to login", {
        variant: "error",
      });
    }
  };

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

  const catchRequestId = (row) => {
    setRequestCode(row.code);
    setrequestObj(row);
    console.log(row.code);
  };

  return (
    <div>
      {/* <Button onClick={() => redirect("/receiving-log")}>Redirect</Button> */}
      <Typography className="text-center font-bold my-5" variant="h4">
        BDU Intake
      </Typography>

      <div className="p-5 bg-black text-white mt-8">
        <Paper elevation={3}>
          {!show && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold text-base">#</TableCell>
                    <TableCell className="font-bold text-base">Code</TableCell>
                    <TableCell className="font-bold text-base">
                      Message
                    </TableCell>
                    <TableCell className="font-bold text-base">
                      Requested By
                    </TableCell>
                    <TableCell className="font-bold text-base">
                      Released By
                    </TableCell>
                    <TableCell className="font-bold text-base">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests
                    ?.filter((filtered) => filtered.status === 7)
                    .map((row, idx) => (
                      <TableRow key={row.id}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{row.code}</TableCell>
                        <TableCell>{row.message}</TableCell>
                        <TableCell>{row.receiverId}</TableCell>
                        <TableCell>{row.userId}</TableCell>
                        <TableCell
                          onClick={() => {
                            catchRequestId(row);
                            setShow(!show);
                            // postOutbound(row?.id);
                          }}
                          className="text-red-400 cursor-pointer"
                        >
                          Take In
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {show && (
            <div className="text-white mt-8 bg-black px-[20%]">
              <div className="flex gap-6 mb-4">
                <div className="flex justify-between gap-8 w-full">
                  <div className="flex justify-between gap-8 w-1/2">
                    <div className="w-full">
                      <Typography className="text-white mb-2 ml-3 w-full">
                        Select Store
                      </Typography>
                      <FormControl className="w-full" fullWidth>
                        {/* <InputLabel>Select Field</InputLabel> */}
                        <Autocomplete
                          className="m-2"
                          disablePortal
                          onChange={
                            (event, newValue) =>
                              // handleChange(event, newValue)
                              setFormData({
                                ...formData,
                                storeId: newValue?.id,
                              })
                            // console.log(newValue)
                          }
                          // id="combo-box-demo"
                          options={stores?.map((e) => ({
                            label: e?.name,
                            id: e?.id,
                          }))}
                          sx={{ minWidth: 200 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="w-full">
                    <Typography className="text-white mb-2 ml-3 w-full">
                      Select Rack
                    </Typography>
                    <FormControl className="w-full" fullWidth>
                      {/* <InputLabel>Select Field</InputLabel> */}
                      <Autocomplete
                        className="m-2"
                        disablePortal
                        onChange={
                          (event, newValue) =>
                            // handleChange(event, newValue)
                            setFormData({ ...formData, rack: newValue?.id })
                          // console.log(newValue)
                        }
                        // id="combo-box-demo"
                        options={(
                          rack.filter((e) => e.storeId == formData.storeId) ||
                          []
                        )?.map((e) => ({
                          label: e?.name,
                          id: e?.id,
                        }))}
                        sx={{ minWidth: 200 }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      {/* <Select
                  className="bg-white w-full"
                  name="rack"
                  value={formData.rack}
                  onChange={handleChange}
                >
                  {rack?.filter((e)=>e?.storeId == formData.storeId)?.map((e) => (
                    <MenuItem value={e?.id}>{e?.name}</MenuItem>
                  ))}
                </Select> */}
                    </FormControl>
                  </div>
                </div>
                <div className="flex justify-between gap-8 w-full">
                  <div className="w-full">
                    <Typography className="text-white mb-2 ml-3 w-full">
                      Select Shelf
                    </Typography>
                    <Autocomplete
                      className="m-2"
                      disablePortal
                      onChange={
                        (event, newValue) =>
                          // handleChange(event, newValue)
                          setFormData({ ...formData, shelfCode1: newValue?.id })
                        // console.log(newValue)
                      }
                      // id="combo-box-demo"
                      options={(shelvesByRack?.shelves || [])?.map((e) => ({
                        label: e?.label,
                        id: e?.label,
                      }))}
                      sx={{ minWidth: 200 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <FormControl className="w-full" fullWidth>
                      {/* <InputLabel>Select Field</InputLabel> */}
                      {/* <Select
                  className="bg-white w-full"
                  name="shelfCode1"
                  value={formData.shelfCode1}
                  onChange={handleChange}
                >
                  {shelvesByRack?.shelves?.map((e) => (
                    <MenuItem value={e?.label}>{e?.label}</MenuItem>
                  ))}
                </Select> */}
                    </FormControl>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-1 text-white cursor-pointer"
                onClick={() => {
                  setShow(!show);
                }}
              >
                <ArrowBackTwoTone />
                <Typography className="font-bold">Back</Typography>
              </div>
              <Typography variant="h5" className="font-bold mb-5 text-center">
                Incoming Items
              </Typography>
              <div className="flex justify-between items-center text-white">
                <div className="text-white">
                  <p className="text-base font-bold">Product No.</p>
                  {/* <p className="text-white mt-1 text-center">{e?.name}</p> */}
                </div>
                <div className="text-center">
                  <p className="text-base font-bold">Stock Code</p>
                  {/* <p className="text-white mt-1 text-center">{e?.quantity}</p> */}
                </div>
              </div>
              {requestsDetails?.map((e) => (
                <div className="flex justify-between items-center text-white">
                  <div className="text-white">
                    <p className="text-white mt-1 text-center">
                      {e?.productNo}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white mt-1 ">{e?.code}</p>
                  </div>
                </div>
              ))}

              <Button
                className="mt-3 w-full p-3"
                onClick={() => {
                  postOutbound(requestObj?.code);
                }}
              >
                Accept
              </Button>
            </div>
          )}

          {/* requestsDetails */}
        </Paper>
      </div>
    </div>
  );
};

export default StockIntake;

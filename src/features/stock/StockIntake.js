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
  const [isLoading, setisLoading] = React.useState(false);

  const redirect = useNavigate();

  // StoreStocks
  const getRacksQueryResult = RackApi.useGetRackQuery({});
  const rack = getRacksQueryResult?.data;

  const [stockConfirmReleaseMuation, stockConfirmReleaseMutationResult] =
    StockApi.useStockTransferIntakeMutation();

  const getShelvesByRackQueryResult = RackApi.useGetShelvesByRackIdQuery({
    id: formData.rack,
  });
  const shelvesByRack = getShelvesByRackQueryResult?.data || [];

  const getShelvesQueryResult = RackApi.useGetShelvesQuery({});
  const shelves = getShelvesQueryResult?.data || [];

  const getProductsQuery = UserApi.useGetStoreProductsQuery({ TaggingId });
  const products = getProductsQuery?.data || [];

  const getAllDeliveryQuery = DeliveryApi.useGetAllDeliveriesQuery();
  const allDeliveries = getAllDeliveryQuery.data || [];

  const [stockIntakeMuation, stockIntakeMutationResult] =
    StockApi.useStockIntakeMutation();

  const getStoreStocksQueryResult = UserApi.useGetStoreStocksQuery({
    TaggingId,
  });
  const getRequestsQueryResult = ReqApi.useGetRequestQuery({
    TaggingId,
  });
  const requests = getRequestsQueryResult?.data || [];

  const getRequestsDetailsQueryResult = ReqApi.useGetReleasedStocksQuery({
    RequestCode,
  });
  const requestsDetails = getRequestsDetailsQueryResult?.data || [];

  const storeStockInStore = getStoreStocksQueryResult?.data || [];

  const getProductsInStoresResult = ReportsApi.useGetProductBalancesQuery({});
  const productsInStore = getProductsInStoresResult?.data || [];

  const getStoreQueryResult = StoreApi.useGetStoresQuery({});
  const stores = getStoreQueryResult?.data || [];

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
    setisLoading(true);
    let payload = {
      shelfCode: formData.shelfCode,
      productBarcode: products?.find(
        (prod) => prod?.id === formData.productBarcode
      )?.barcode,
      quantity: +formData.quantity,
    };

    if (+formData.quantity == 0) {
      enqueueSnackbar("Failed! Quantity cannot be Zero", {
        variant: "error",
      });
      return;
    }

    console.log(payload);
    try {
      setisLoading(false);
      const data = await stockIntakeMuation({ data: payload }).unwrap();
      // TODO extra login
      // console.log(data.data);
      enqueueSnackbar("successful", { variant: "success" });
      // setRefreshD((orev)=>orev+1)
      redirect("/receiving-log");
    } catch (error) {
      setisLoading(false);
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

  console.log(
    allDeliveries?.filter((item) =>
      products
        ?.filter((barcodedProducts) => barcodedProducts.barcode)
        ?.some((filterItem) => filterItem?.id === item?.productId)
    )
    // ?.filter((prod) => prod?.barcode)

    // ?.map((e) => ({
    //   label: products?.find((product) => e?.productId === product?.id)?.name,
    //   id: e?.productId,
    // }))
  );
  return (
    <div>
      {/* <Button onClick={() => redirect("/receiving-log")}>Redirect</Button> */}
      <Typography className="text-center font-bold my-5" variant="h4">
        Stock Intake
      </Typography>
      <div className="flex gap-6">
        <div title="" className="px-8 py-4 w-full bg-black rounded-2xl">
          <div className="mb-5">
            <div className="flex gap-6">
              <div className="flex justify-between gap-6 w-full">
                <div className="w-full">
                  <Typography className="text-white mb-2 ml-3 w-full">
                    Select Product
                  </Typography>
                  <FormControl className="w-full" fullWidth>
                    {/* <InputLabel>Select Field</InputLabel> */}
                    <Autocomplete
                      className=" m-2"
                      disablePortal
                      onChange={
                        (event, newValue) =>
                          // handleChange(event, newValue)
                          setFormData({
                            ...formData,
                            productBarcode: newValue?.id,
                          })
                        // console.log(newValue)
                      }
                      // id="combo-box-demo"
                      options={allDeliveries
                        ?.filter((item) =>
                          products
                            ?.filter(
                              (barcodedProducts) => barcodedProducts.barcode
                            )
                            ?.some(
                              (filterItem) => filterItem?.id === item?.productId
                            )
                        )
                        // ?.filter((prod) => prod?.barcode)

                        ?.map((e) => ({
                          label: products?.find(
                            (product) => e?.productId === product?.id
                          )?.name,
                          id: e?.productId,
                        }))}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </FormControl>
                </div>
                <div className="w-full">
                  <Typography className="text-white mb-2 ml-3 w-full">
                    Select Store
                  </Typography>
                  <FormControl className="w-full" fullWidth>
                    {/* <InputLabel>Select Field</InputLabel> */}
                    <Select
                      className="bg-white w-full"
                      name="storeId"
                      value={formData.storeId}
                      onChange={handleChange}
                    >
                      {stores?.map((e) => (
                        <MenuItem value={e?.id}>{e?.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="">
                  <Typography className="text-white mb-2 ml-3">
                    Select Rack
                  </Typography>

                  <FormControl fullWidth>
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
                      options={rack
                        ?.filter((e) => e?.storeId == formData.storeId)
                        ?.map((e) => ({
                          label: e?.name,
                          id: e?.id,
                        }))}
                      sx={{ minWidth: 200 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </FormControl>
                </div>
                <div className="w-full">
                  <Typography className="text-white mb-2 ml-3 w-full">
                    Select Shelf
                  </Typography>
                  <FormControl className="w-full" fullWidth>
                    {/* <InputLabel>Select Field</InputLabel> */}
                    {/* <Autocomplete
                      className="m-2"
                      disablePortal
                      onChange={
                        (event, newValue) =>
                          // handleChange(event, newValue)
                          setFormData({
                            ...formData,
                            shelfCode: newValue?.label,
                          })
                        // console.log(newValue)
                      }
                      // id="combo-box-demo"
                      options={[shelvesByRack?.shelves||[]]?.map((e) => ({
                        label: e?.label,
                        id: e?.label,
                      }))}
                      // sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} />}
                    /> */}
                    <Select
                      className="bg-white w-full"
                      name="shelfCode"
                      value={formData.shelfCode}
                      onChange={handleChange}
                    >
                      {shelvesByRack?.shelves?.map((e) => (
                        <MenuItem value={e?.label}>{e?.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="w-full">
                  <Typography className="text-white mb-2 ml-3 w-full">
                    Quantity
                  </Typography>
                  {/* <InputLabel>Select Field</InputLabel> */}
                  <TextField
                    className="bg-white rounded-full w-full min-w-[100px]"
                    // label="Field 1"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Click to input Quantity"
                  />
                </div>
              </div>
            </div>
            <Button className="mt-4" onClick={postIntake}>
              Add
            </Button>
          </div>
          {/* <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold text-base"></TableCell>
                  <TableCell className="font-bold text-base">Store</TableCell>
                  <TableCell className="font-bold text-base">Items</TableCell>
                  <TableCell className="font-bold text-base">
                    Date Created
                  </TableCell>
                  <TableCell className="font-bold text-base">
                    Reorder Level
                  </TableCell>
                  <TableCell className="font-bold text-base">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsInStore?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row?.column1}</TableCell>
                    <TableCell>{row?.warehouse}</TableCell>
                    <TableCell>{row?.product}</TableCell>
                    <TableCell>
                      {moment(row?.lpDate).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{row?.reOrderLevel}</TableCell>
                    <TableCell>{row.balance}</TableCell>
                  </TableRow>
                  // <div></div>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}

          {/* <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Store</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataApproval.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.store}</TableCell>
              <TableCell>{row.dateCreated}</TableCell>
              <TableCell>{row.items}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
        </div>
      </div>
    </div>
  );
};

export default StockIntake;

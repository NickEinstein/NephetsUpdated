import React, { useEffect } from "react";
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
import { Card, Typography } from "@mui/material";
import UserApi from "apis/UserApi";
import StockApi from "apis/StockApi";
import RackApi from "apis/RackApi";
import ReqApi from "apis/ReqApi";
import { useSnackbar } from "notistack";
import { ArrowBackTwoTone, BackspaceTwoTone } from "@mui/icons-material";
import { toggleLoadingModalAction } from "configs/StoreSliceConfig";
import { useDispatch } from "react-redux";

const StockOutbound = () => {
  const dispatch = useDispatch();
  const [clear, setclear] = React.useState(null);
  const [clear1, setclear1] = React.useState(null);
  const [clear2, setclear2] = React.useState(null);
  const [clear3, setclear3] = React.useState(null);
  const [clear4, setclear4] = React.useState(null);
  const [clear5, setclear5] = React.useState(null);
  const [formData, setFormData] = React.useState({
    shelfCode: "",
    productBarcode: "",
    quantity: "",
    comment: "",
    requestCode: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const [TaggingId, setTaggingId] = React.useState();
  const [items, setItems] = React.useState([]);
  const [RequestCode, setRequestCode] = React.useState();
  const [show, setShow] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);

  // StoreStocks
  const getRacksQueryResult = RackApi.useGetRackQuery({});
  const rack = getRacksQueryResult?.data;

  const getShelvesQueryResult = RackApi.useGetShelvesQuery({});
  const shelves = getShelvesQueryResult?.data;

  const getProductsQuery = UserApi.useGetStoreProductsQuery({ TaggingId });
  const products = getProductsQuery?.data;

  const getPendingRelease = ReqApi.useGetPendingReleaseQuery({});
  const pendingRelease = getPendingRelease?.data;

  const [stockOutboundMuation, stockOutboundMutationResult] =
    StockApi.useStockOutboundMutation();

  const getStoreStocksQueryResult = UserApi.useGetStoreStocksQuery({
    TaggingId,
  });
  const storeStockInStore = getStoreStocksQueryResult?.data;

  const getRequestsQueryResult = ReqApi.useGetRequestQuery({
    // TaggingId,
  });
  const requests = getRequestsQueryResult?.data;

  const getRequestsDetailsQueryResult = ReqApi.useGetRequestDetailQuery({
    RequestCode,
  });
  const requestsDetails = getRequestsDetailsQueryResult?.data;

  // setFormData({requestCode:requestsDetails?.request?.code})

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

  const postOutbound = async () => {
    setisLoading(true)
    let payload = {
      shelfCode: formData.shelfCode,
      requestCode: requestsDetails?.request?.code,
      comment: formData.comment,
      items: items,
    };

    console.log(payload);
    setFormData();
    try {
      const data = await stockOutboundMuation({ data: payload }).unwrap();
      // TODO extra login
      console.log(data);
      data.message
        ? enqueueSnackbar(data.message, { variant: "error" })
        : enqueueSnackbar("Released successfully", { variant: "success" });
      setFormData();
      // setRefreshD((orev)=>orev+1)
      // redirect();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.data?.message, "Failed to login", {
        variant: "error",
      });
      setFormData();
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
      productBarcode: formData.productBarcode,
      quantity: formData.quantity,
    };

    let cow = [];
    cow = [...cow, payload];

    formData.productBarcode && formData.quantity
      ? setItems([...items, payload])
      : enqueueSnackbar("Please make sure all fields are duefully filled", {
          variant: "error",
        });
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
      {show && (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            setShow(!show);
          }}
        >
          <ArrowBackTwoTone />
          <Typography className="font-bold">Back</Typography>
        </div>
      )}
      <Typography className="text-center font-bold my-5" variant="h4">
        Material Issuance
      </Typography>
      {show ? (
        <div>
          {!requestsDetails?.request && (
            <div className="flex justify-center items-center 50vh">
              <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-12 w-12"></div>
            </div>
          )}

          {requestsDetails?.request && (
            <div>
              <div className="flex gap-6">
                <Card
                  title=""
                  className="px-8 py-4 w-full bg-black rounded-2xl"
                >
                  <div className="flex gap-8">
                    <div className="mb-5 w-full">
                      <div className="flex gap-6">
                        <div className="flex justify-between gap-8 w-1/2">
                          <div className="w-full">
                            <Typography className="text-white mb-2 ml-3 w-full">
                              Select Shelf
                            </Typography>
                            <FormControl className="w-full" fullWidth>
                              {/* <InputLabel>Select Field</InputLabel> */}
                              <Select
                                className="bg-white w-full"
                                name="shelfCode"
                                value={formData?.shelfCode}
                                onChange={handleChange}
                              >
                                {shelves?.map((e) => (
                                  <MenuItem value={e?.label}>
                                    {e?.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        <div className="flex justify-between gap-8  w-1/2">
                          <div className="w-full">
                            <Typography className="text-white mb-2 ml-3 w-full">
                              Request Code
                            </Typography>
                            <FormControl className="w-full" fullWidth>
                              {/* <InputLabel>Select Field</InputLabel> */}
                              <TextField
                                className="bg-white rounded-full"
                                // label="Field 1"
                                name="requestCode"
                                value={requestsDetails?.request?.code}
                                onChange={handleChange}
                                fullWidth
                                readOnly
                                placeholder="Click to input Request Code"
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <FormControl className="w-full mt-4" fullWidth>
                        <Typography className="text-white ml-3 ">
                          Comments
                        </Typography>
                        {/* <InputLabel>Select Field</InputLabel> */}
                        <TextField
                          className="bg-white rounded-full"
                          // label="Field 1"
                          multiline
                          rows={2}
                          name="comment"
                          value={formData?.comment}
                          onChange={handleChange}
                          fullWidth
                          placeholder="Click to input Comment"
                        />
                      </FormControl>
                      <div className="text-white mt-8 ">
                        <Typography
                          variant="h5"
                          className="font-bold mb-5 text-center"
                        >
                          Requested Items
                        </Typography>
                        <div className="flex justify-between items-center text-white">
                          <div className="text-white">
                            <p className="text-base font-bold">Product</p>
                            {/* <p className="text-white mt-1 text-center">{e?.name}</p> */}
                          </div>
                          <div className="text-center">
                            <p className="text-base font-bold">Quantity</p>
                            {/* <p className="text-white mt-1 text-center">{e?.quantity}</p> */}
                          </div>
                        </div>
                        {requestsDetails?.requestedItems?.map((e) => (
                          <div className="flex justify-between items-center text-white">
                            <div className="text-white">
                              <p className="text-white mt-1 text-center">
                                {e?.name}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-white mt-1 ">{e?.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="mb-5">
                        <Typography variant="h4" className="font-bold">
                          ADD ITEMS
                        </Typography>
                        <div className="flex gap-6">
                          <div className="flex justify-between gap-8 w-1/2">
                            <div className="w-full">
                              <Typography className="text-white mb-2 ml-3 w-full">
                                Select Product
                              </Typography>
                              <FormControl className="w-full" fullWidth>
                                {/* <InputLabel>Select Field</InputLabel> */}
                                <Select
                                  className="bg-white w-full"
                                  name="productBarcode"
                                  value={formData?.productBarcode}
                                  onChange={handleChange}
                                >
                                  {products
                                    ?.filter((prod) => prod?.barcode)
                                    .filter((item) =>
                                      requestsDetails?.requestedItems.some(
                                        (filterItem) =>
                                          filterItem.name === item.name
                                      )
                                    )

                                    .map((e) => (
                                      <MenuItem value={e?.barcode}>
                                        {e?.name}
                                      </MenuItem>
                                    ))}
                                </Select>
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
                                  value={formData?.quantity}
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
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>#</TableCell>
                              <TableCell>Product Barcode</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {items.map((row, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{row.productBarcode}</TableCell>
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
                    disabled={
                      !formData?.shelfCode ||
                      !items?.length ||
                      !requestsDetails?.request?.code ||
                      !formData?.comment
                    }
                    onClick={postOutbound}
                    // type="submit"
                    // color="primary"
                    className="p-3 w-full bg-[#2BDF27] flex justify-center gap-9 items-center text-base my-6"
                    // onClick={() => localStorage.setItem('type', 'CLIENT')}
                    // className=' '
                  >
                    {isLoading && (
                      <div class="flex items-center justify-center">
                        <div class="border-t-4 border-white border-solid rounded-full animate-spin h-4 w-4"></div>
                      </div>
                    )}
                    Release
                  </Button>
                </Card>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Paper elevation={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Requested By</TableCell>
                  <TableCell>Released By</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests
                  ?.filter((filtered) => filtered.status === 2)
                  .map((row, idx) => (
                    <TableRow key={row.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.message}</TableCell>
                      <TableCell>{row.receiverId}</TableCell>
                      <TableCell>{row.userId}</TableCell>
                      <TableCell
                        onClick={() => {
                          setRequestCode(row?.code);
                          setShow(!show);
                        }}
                        className="text-red-400 cursor-pointer"
                      >
                        Release
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};

export default StockOutbound;

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
import {
  Autocomplete,
  Card,
  Checkbox,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import ReqApi from "apis/ReqApi";
import StockApi from "apis/StockApi";
import UserApi from "apis/UserApi";
import RackApi from "apis/RackApi";
import { useSnackbar } from "notistack";
import useAuthUser from "hooks/useAuthUser";
import ReturnApi from "apis/ReturnApi";

const StockReturns = () => {
  const user = useAuthUser();
  console.log(user);
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

  // StoreStocks
  const getRacksQueryResult = RackApi.useGetRackQuery({});
  const rack = getRacksQueryResult?.data || [];

  const getShelvesByRackQueryResult = RackApi.useGetShelvesByRackIdQuery({
    id: formData.rack,
  });
  const shelvesByRack = getShelvesByRackQueryResult?.data || [];

  const getProductsQuery = UserApi.useGetStoreProductsQuery({ TaggingId });
  const products = getProductsQuery?.data || [];

  const [stockOutboundMuation, stockOutboundMutationResult] =
    ReturnApi.useReturnStockMutation();

  const getRequestsQueryResult = ReqApi.useGetRequestQuery({
    // TaggingId,
  });
  const requests = getRequestsQueryResult?.data || [];

  const getRequestsDetailsQueryResult = ReqApi.useGetRequestDetailQuery({
    RequestCode,
  });
  const requestsDetails = getRequestsDetailsQueryResult?.data || [];

  // setFormData({requestCode:requestsDetails?.request?.code})

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
    let payload = {
      requestCode: RequestCode,
      reason: +formData.reason,
      note: formData.comment,
      items: [
        ...items,
        // {
        //   productId: 1373,
        //   shelfId: 91,
        //   quantity: 12,
        // },
      ],
    };
    // {
    //   shelfCode: formData.shelfCode,
    //   requestCode: requestsDetails?.request?.code,
    //   comment: formData.comment,
    //   items: items,
    // };

    console.log(payload);
    try {
      const data = await stockOutboundMuation({ data: payload }).unwrap();
      // TODO extra login
      console.log(data);
      data.message
        ? enqueueSnackbar(data.message, { variant: "error" })
        : enqueueSnackbar("Returned successfully", { variant: "success" });
      // setRefreshD((orev)=>orev+1)
      // redirect();
    } catch (error) {
      console.log(error.data);
      enqueueSnackbar(error?.data, "", {
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
  let id = 0;
  const addItem = () => {
    id = id + 1;
    let payload = {
      id: items.length + 1,
      productId: +formData.productId,
      quantity: +formData.quantity,
      shelfId: formData.shelfCode,
    };

    console.log(payload);

    // {
    //   productId: 1373,
    //   shelfId: 91,
    //   quantity: 12,
    // },

    let cow = [];
    cow = [...cow, payload];

    formData.productId && formData.quantity
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
      <Typography className="text-center font-bold my-5" variant="h4">
        Stock Return
      </Typography>
      <div className="flex gap-6">
        <Card title="" className="px-8 py-4 w-full bg-black rounded-2xl">
          <div className="flex gap-8">
            <form className="flex flex-col gap-4 w-2/5" onSubmit={handleSubmit}>
              <div>
                <Typography className="text-white">
                  Reason for Stock Return
                </Typography>
                <FormControl fullWidth>
                  {/* <InputLabel>Select Field</InputLabel> */}
                  <Select
                    className="bg-white"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                  >
                    <select
                      class="form-control"
                      data-val="true"
                      data-val-required="Please specify reason."
                      id="Reason"
                      name="Reason"
                    ></select>
                    <MenuItem value="0">Surplus</MenuItem>
                    <MenuItem value="1">WrongRequest</MenuItem>
                    <MenuItem value="2">Faulty</MenuItem>
                    <MenuItem value="3">Unsable</MenuItem>
                    <MenuItem value="4">CriticalNeed</MenuItem>
                    <MenuItem value="5">Repair</MenuItem>
                    <MenuItem value="6">ReAllocation</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <Typography className="text-white">
                  HQ return or Local Store Return
                </Typography>
                <FormControl fullWidth>
                  {/* <InputLabel>Select Field</InputLabel> */}
                  <Select
                    className="bg-white"
                    name="store"
                    value={formData.store}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Please select a destination</MenuItem>
                    <MenuItem value="1">HQ return</MenuItem>
                    <MenuItem value="0">Local Store return</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="w-full">
                <Typography className="text-white mb-2 ml-3 w-full">
                  Select Request Code
                </Typography>
                <FormControl className="w-full" fullWidth>
                  <Select
                    className="bg-white w-full"
                    name="reqCode"
                    value={formData.reqCode}
                    onChange={(e) => {
                      handleChange(e);
                      setRequestCode(e.target.value);
                    }}
                  >
                    {requests
                      ?.filter(
                        (req) =>
                          req.status == 6 && user?.locationId == req?.locationId
                      )
                      ?.map((e) => (
                        <MenuItem value={e?.code}>{e?.code}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className=" gap-4">
                <Typography className="text-white">
                  Please enter comments
                </Typography>
                <TextareaAutosize
                  className="rounded p-3 text-black"
                  name="comment"
                  minRows={5} // Minimum number of rows to display
                  maxRows={6} // Maximum number of rows to display before scrolling
                  placeholder="Enter your text here..."
                  onChange={handleChange}
                  value={formData.comment}
                  style={{ width: "100%" }}
                />
              </div>
              <Button onClick={postOutbound}>Post</Button>
            </form>

            <div className="flex flex-col gap-4 w-3/5">
              <Typography className="text-white" variant="h6">
                Please select Items to return
              </Typography>
              <Typography className="text-white">
                Scanned items valid for return will be listed below. Stock items
                will be listed based on destination selected. Stock will be
                returned to project type it was created in.
              </Typography>
              <Typography className="text-white">
                For HQ return the item must be in the BU store with stock status
                ‘In-Store’ (Items already taken into the BU store).
                {/* While for
                local store return, the item must be authorized (SRIN status
                must have been completed) only scanned items matching this
                criteria will be displayed */}
              </Typography>
              <div className="flex gap-6">
                <div className="flex justify-between gap-8 w-full">
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
                        options={rack?.map((e) => ({
                          label: e?.name,
                          id: e?.id,
                        }))}
                        sx={{ minWidth: 200 }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="flex justify-between gap-8 w-full">
                  <div className="w-full">
                    <Typography className="text-white mb-2 ml-3 w-full">
                      Select Shelf
                    </Typography>
                    <FormControl className="w-full" fullWidth>
                      <Autocomplete
                        className="m-2"
                        disablePortal
                        onChange={
                          (event, newValue) =>
                            // handleChange(event, newValue)
                            setFormData({
                              ...formData,
                              shelfCode: newValue?.id,
                            })
                          // console.log(newValue)
                        }
                        // id="combo-box-demo"
                        options={(shelvesByRack?.shelves || [])?.map((e) => ({
                          label: e?.label,
                          id: e?.id,
                        }))}
                        sx={{ minWidth: 200 }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="flex justify-between gap-8 w-full">
                  <div className="w-full">
                    <Typography className="text-white mb-2 ml-3 w-full">
                      Select Product
                    </Typography>
                    <FormControl className="w-full" fullWidth>
                      <Select
                        className="bg-white w-full"
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                      >
                        {requestsDetails?.requestedItems
                          // {allDeliveries
                          // ?.filter((item) =>
                          //   products
                          //     ?.filter(
                          //       (barcodedProducts) => barcodedProducts.barcode
                          //     )
                          //     .some(
                          //       (filterItem) =>
                          //         filterItem?.id === item?.productId
                          //     )
                          // )
                          // ?.filter((prod) => prod?.barcode)
                          ?.map((e) => (
                            <MenuItem
                              value={
                                products?.find(
                                  (product) => e?.name === product?.name
                                )?.id
                              }
                            >
                              {e?.name}
                              {/* {
                                products?.find(
                                  (product) => e?.productId === product?.id
                                )?.name
                              } */}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {/* <div className="flex justify-between gap-8 w-full">
                  <div className="w-full">
                    <Typography className="text-white mb-2 ml-3 w-full">
                      Select Product
                    </Typography>
                    <FormControl className="w-full" fullWidth>
                    <Autocomplete
                      className="m-2"
                      disablePortal
                      onChange={
                        (event, newValue) =>
                          // handleChange(event, newValue)
                          // setFormData({ ...formData, productId: newValue?.id })
                        console.log(newValue)
                      }
                      // id="combo-box-demo"
                      options={(requestsDetails?.requestedItems||[])
                        ?.map((e) => ({
                          label: e?.name,
                          id: e?. products?.find(
                            (product) => e?.name === product?.name
                          )?.id,
                        }))}
                      sx={{ minWidth: 200 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                     
                    </FormControl>
                  </div>
                </div> */}
                <div className="flex justify-between gap-8  w-full">
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
              {/* <Button className="bg-red-500  text-white">
                Remove Selected Items
              </Button> */}
              <Button className="mt-4" onClick={addItem}>
                Add
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Product Barcode</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Shelf</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          {
                            products.find(
                              (product) => product.id == row.productId
                            ).name
                          }
                        </TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>
                          {
                            shelvesByRack?.shelves.find(
                              (shelf) => shelf.id == row.shelfId
                            ).label
                          }
                        </TableCell>

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
        </Card>
      </div>
    </div>
  );
};

export default StockReturns;

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import DatePicker from "react-datepicker";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from "@mui/material/InputLabel";
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

// import { DatePicker  } from "@mui/x-date-pickers";
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
import DeliveryApi from "apis/DeliveryApi";
import VendorApi from "apis/VendorApi";
import { useSnackbar } from "notistack";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const StockDeliveries = () => {
  const [refreshD, setRefreshD] = useState(0);
  const [itemz, setItemz] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const getStoreProductsQueryResult = UserApi.useGetStoreProductsQuery({});
  const products = getStoreProductsQueryResult?.data;

  const getTempDeliveriesQueryResult = DeliveryApi.useGetTempDeliveriesQuery({
    refreshD,
  });
  const tempDeliveries = getTempDeliveriesQueryResult?.data;
  console.log(tempDeliveries);

  const getVendorQueryResult = VendorApi.useGetVendorsQuery({});
  const vendor = getVendorQueryResult?.data;
  console.log(vendor);

  const [stockDeliveryMuation, stockDeliveryMutationResult] =
    DeliveryApi.useStockDeliveryMutation();

  const [stockDiscardMuation, stockDiscardMutationResult] =
    DeliveryApi.useDiscardMutation();

  const [finalDeliveryMuation, finalDeliveryMutationResult] =
    DeliveryApi.useFinalDeliveryMutation();

  const [formData, setFormData] = useState({
    userId: 0,
    productId: null,
    unitCost: "",
    quantity: "",
    waybill: "",
    workOrder: "",
    vendorId: "",
  });
  const [newValue, setNewValue] = useState();
  const [newValueProduct, setNewValueProduct] = useState(null);

  const redirect = useNavigate();

  const postDelivery = async () => {
    setIsLoading(true);
    let payload = {
      // id: 0,
      ...formData,

      userId: 0,
      productId: +formData.productId,
      unitCost: +formData.unitCost,
      quantity: +formData.quantity,
    };

    if (itemz.find((e) => e?.productId == formData.productId)) {
      enqueueSnackbar("Item already Exists on your list", { variant: "error" });
      setIsLoading(false);
    } else {
      setIsLoading(false);

      setItemz([
        ...itemz,
        {
          productName: newValueProduct.label,
          productId: +formData.productId,
          unitCost: +formData.unitCost,
          quantity: +formData.quantity,
        },
      ]);
    }

    console.log(payload);
    setFormData({
      userId: 0,
      productId: "",
      unitCost: "",
      quantity: "",
      // waybill: "",
      // workOrder: "",
      // vendorId: "",
    });

    setNewValueProduct(null);
    // try {
    //   const data = await stockDeliveryMuation({ data: payload }).unwrap();
    //   // TODO extra login
    //   // console.log(data.data);
    //   enqueueSnackbar("Added Successfully", { variant: "success" });
    //   setRefreshD((orev) => orev + 1);
    //   setFormData({
    //     userId: 0,
    //     productId: "",
    //     unitCost: "",
    //     quantity: "",
    //     waybill: "",
    //     workOrder: "",
    //     vendorId: "",
    //   });
    //   // redirect();
    // } catch (error) {
    //   console.log(error);
    //   enqueueSnackbar(
    //     error.data.title || "Please make sure all fields were properly entered",
    //     "Please make sure all fields were properly entered",
    //     {
    //       variant: "error",
    //     }
    //   );
    // }
  };

  const discardDelivery = async () => {
    let payload = {
      // id: 0,
      ...formData,

      userId: 0,
      productId: +formData.productId,
      unitCost: +formData.unitCost,
      quantity: +formData.quantity,
    };

    console.log(payload);
    try {
      const data = await stockDiscardMuation().unwrap();
      // TODO extra login
      // console.log(data.data);
      enqueueSnackbar("Discarded Successfully", { variant: "success" });
      setRefreshD((orev) => orev + 1);
      setFormData({
        userId: 0,
        productId: "",
        unitCost: "",
        quantity: "",
        waybill: "",
        workOrder: "",
        vendorId: "",
      });
      // redirect();
    } catch (error) {
      enqueueSnackbar(error.data.title, "Failed", {
        variant: "error",
      });
    }
  };

  const startDelivery = async () => {
    setIsLoading(true);

    let payload = {
      // id: 0,
      ...formData,

      id: 0,
      userId: 0,
      date: newValue,
      waybill: formData.waybill,
      workOrderNo: formData.workOrder,
      purchaseId: null,
      vendorId: formData.vendorId,
      items: [...itemz],
    };

    if (
      newValue &&
      formData?.waybill &&
      formData?.workOrder &&
      formData?.vendorId &&
      itemz.length > 0
    ) {
      try {
        const data = await finalDeliveryMuation({ data: payload }).unwrap();
        // TODO extra login
        // console.log(data.data);
        setIsLoading(false);

        enqueueSnackbar("Delivery Posted", { variant: "success" });
        setFormData({
          userId: 0,
          productId: "",
          unitCost: "",
          quantity: "",
          waybill: "",
          workOrder: "",
          vendorId: "",
        });

        redirect("/delivery-report");
      } catch (error) {
        console.log(error.data.title);
        setIsLoading(false);

        enqueueSnackbar(
          error.data.title ||
            "Please make sure all fields were properly entered",
          "Please make sure all fields were properly entered",
          "Failed",
          {
            variant: "error",
          }
        );
      }
    } else {
      enqueueSnackbar("Please Properly input data", { variant: "error" });
      setIsLoading(false);
    }
  };

  const data = [
    // {
    //   id: 1,
    //   column1: "mixer tap",
    //   column2: "10",
    //   column3: "1000",
    //   column4: "10,000",
    //   column5: "",
    //   // column6: "mixer tap 5",
    // },
    // {
    //   id: 2,
    //   column1: "Tonardo Nail",
    //   column2: "2000",
    //   column3: "100",
    //   column4: "20000,",
    //   column5: "",
    //   // column6: "mixer tap 5",
    // },
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
  const toDeleteProduct = (id) => {
    let temp = itemz?.filter((e) => e?.productId !== id);
    setItemz(temp);
  };

  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h4">
        Stock Deliveries
      </Typography>
      <div className="flex gap-6">
        <Card title="" className="px-8 py-4 w-1/3 bg-black rounded-2xl">
          <Typography
            variant="h4"
            className="font-bold text-center"
          ></Typography>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <label className="text-white">Select Product</label>
              <Autocomplete
                className="m-2"
                disablePortal
                value={newValueProduct}
                onChange={(event, newValue) =>
                  // handleChange(event, newValue)
                  {
                    setFormData({ ...formData, productId: newValue?.id });
                    setNewValueProduct(newValue);
                  }
                }
                // id="combo-box-demo"
                options={products?.map((e) => ({
                  label: e?.name,
                  id: e?.id,
                }))}
                sx={{ minWidth: 200 }}
                renderInput={(params) => <TextField {...params} />}
              />
              {/* <Select
                square
                className="bg-white"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
              >
                {products?.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select> */}
            </FormControl>
            <div className="flex gap-4">
              <TextField
                className="bg-white rounded-full"
                // label="Field 1"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                fullWidth
                placeholder="Click to input Quantity"
              />
              <TextField
                className="bg-white rounded-full"
                // label="Field 2"
                name="unitCost"
                value={formData.unitCost}
                onChange={handleChange}
                fullWidth
                placeholder="Click to input Cost"
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Controlled picker"
                  value={newValue}
                  onChange={(newValue) => setNewValue(newValue)}
                />
              </LocalizationProvider> */}
            </div>
            <div className="w-full flex justify-center">
              <Button onClick={postDelivery}>Add New Item</Button>
            </div>
            <div>
              {/* <TextField
                className="bg-white rounded-full"
                // label="Field 3"
                name="field3"
                value={formData.field3}
                onChange={handleChange}
                fullWidth
              /> */}
              <div>
                <DatePicker
                  className="h-30"
                  selected={newValue}
                  onChange={(newValue) => setNewValue(newValue)}
                />
              </div>

              <label className="text-white">Delivery Date</label>
            </div>
            <div>
              <TextField
                className="bg-white rounded-full"
                // label="Field 4"
                name="waybill"
                value={formData.waybill}
                onChange={handleChange}
                fullWidth
              />
              <label className="text-white">Waybill</label>
            </div>
            <div>
              <TextField
                className="bg-white rounded-full"
                // label="Field 5"
                name="workOrder"
                value={formData.workOrder}
                onChange={handleChange}
                fullWidth
              />
              <label className="text-white">Work Order No.</label>
            </div>
            <div>
              <FormControl fullWidth>
                <Autocomplete
                  className="m-2"
                  disablePortal
                  onChange={
                    (event, newValue) =>
                      // handleChange(event, newValue)
                      setFormData({ ...formData, vendorId: newValue?.id })
                    // console.log(newValue)
                  }
                  // id="combo-box-demo"
                  options={vendor?.map((e) => ({
                    label: e?.name,
                    id: e?.id,
                  }))}
                  sx={{ minWidth: 200 }}
                  renderInput={(params) => <TextField {...params} />}
                />
                {/* <Select
                  square
                  className="bg-white"
                  name="vendorId"
                  value={formData.vendorId}
                  onChange={handleChange}
                >
                  {vendor?.map((item) => (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select> */}
              </FormControl>
              <label className="text-white">Vendor</label>
            </div>

            {
              <div className="flex gap-3 w-full justify-center">
                <Button
                  type="submit"
                  variant="contained"
                  // color="primary"
                  className="p-3 w-full bg-[#2BDF27] flex justify-center gap-9 items-center text-base mb-6"
                  onClick={startDelivery}
                  // onClick={() => localStorage.setItem('type', 'CLIENT')}
                  // className=' '
                >
                  {isLoading && (
                    <div class="flex items-center justify-center">
                      <div class="border-t-4 border-white border-solid rounded-full animate-spin h-4 w-4"></div>
                    </div>
                  )}
                  Post Delivery
                </Button>
                {/* <Button className="bg-[#DE1B32]">Discard Delivery</Button> */}
              </div>
            }
          </form>
        </Card>
        <Card title="" className="px-8 py-4 w-2/3 bg-black rounded-2xl">
          <Button
            onClick={() => setItemz([])}
            className="bg-red-500 text-white font-bold text-base mb-4"
          >
            Discard Delivery
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="font-bold">
                  <TableCell className="font-bold">Product </TableCell>
                  <TableCell className="font-bold">Quantity</TableCell>
                  <TableCell className="font-bold">Unit Cost</TableCell>
                  <TableCell className="font-bold">Action</TableCell>
                  {/* <TableCell className="font-bold">Remove</TableCell> */}
                  {/* <TableCell>Column 6</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {itemz?.map((row) => (
                  <TableRow key={row.productId}>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.unitCost}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          toDeleteProduct(row.productId);
                        }}
                        className="text-white font-bold bg-red-500"
                      >
                        Delete
                      </Button>
                    </TableCell>
                    {/* <TableCell>{row.column5}</TableCell> */}
                    {/* <TableCell>{row.column6}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </div>
  );
};

export default StockDeliveries;

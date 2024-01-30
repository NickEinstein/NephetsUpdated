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
import { Card, Chip, Typography } from "@mui/material";
import UserApi from "apis/UserApi";
import StockApi from "apis/StockApi";
import RackApi from "apis/RackApi";
import StoreApi from "apis/StoreApi";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
// import { useDispatch, useSelector } from 'react-redux';

const Racks = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    storeId: "",
    rows: "",
    rows: "",
    requestCode: "",
  });
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [TaggingId, setTaggingId] = React.useState();
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reloadItems, setReloadItems] = React.useState(0);

  // StoreStocks
  const getRacksQueryResult = RackApi.useGetRackQuery({ reloadItems });
  const rack = getRacksQueryResult?.data;

  const getRackShelvesQueryResult = RackApi.useGetRackShelvesQuery({
    reloadItems,
  });
  const rackShelves = getRackShelvesQueryResult?.data;

  const getStoresQueryResult = StoreApi.useGetStoresQuery({});
  const stores = getStoresQueryResult?.data;

  const getShelvesQueryResult = RackApi.useGetShelvesQuery({});
  const shelves = getShelvesQueryResult?.data;

  const getProductsQuery = UserApi.useGetStoreProductsQuery({ TaggingId });
  const products = getProductsQuery?.data;

  //   const getPendingRelease = ReqApi.useGetPendingReleaseQuery({});
  //   const pendingRelease = getPendingRelease?.data;

  const [stockOutboundMuation, stockOutboundMutationResult] =
    StockApi.useStockOutboundMutation();

  //   const getRequestsQueryResult = ReqApi.useGetRequestQuery({
  //     // TaggingId,
  //   });
  //   const requests = getRequestsQueryResult?.data;

  //   const getRequestsDetailsQueryResult = ReqApi.useGetRequestDetailQuery({
  //     RequestCode,
  //   });
  //   const requestsDetails = getRequestsDetailsQueryResult?.data;

  // setFormData({requestCode:requestsDetails?.request?.code})

  const [createRackMuation, createRackMutationResult] =
    RackApi.useCreateRacksMutation();

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
    setIsLoading(true);
    let payload = {
      name: formData.name,
      storeId: +formData.storeId,
      rows: +formData.rows,
      columns: +formData.columns,
    };

    console.log(payload);
    try {
      const data = await createRackMuation({ data: payload }).unwrap();
      //   dispatch(getRacksQueryResult);
      setReloadItems((prev) => prev + 1);
      setIsLoading(false);

      // TODO extra login
      // console.log(data.data);
      enqueueSnackbar("Created successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error?.data?.message, "Failed to login", {
        variant: "error",
      });
      setIsLoading(false);
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

  console.log(items);

  const removeItem = (toremove) => {
    const remove = items.filter((item) => item.id !== toremove.id);

    setItems(remove);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
  };

  const handleDelete = () => {
    dispatch(getRacksQueryResult());
    // Handle chip deletion logic here
    console.log("Chip deleted");
  };

  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h4">
        Racks
      </Typography>
      <div className="flex gap-6">
        <Card title="" className="px-8 py-4 w-full bg-black rounded-2xl">
          <div className="flex gap-8">
            <div className="mb-5 w-full">
              <div className="flex gap-6">
                <div className="flex justify-between gap-8 w-1/2">
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
                </div>
                <div className="flex justify-between gap-8  w-1/2">
                  <div className="w-full">
                    <Typography className="text-white mb-2 ml-3 w-full">
                      Name
                    </Typography>
                    <FormControl className="w-full" fullWidth>
                      {/* <InputLabel>Select Field</InputLabel> */}
                      <TextField
                        className="bg-white rounded-full"
                        // label="Field 1"
                        name="name"
                        value={formData?.name}
                        onChange={handleChange}
                        fullWidth
                        readOnly
                        placeholder="Click to input Name"
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <div class="flex justify-between gap-5">
                <FormControl className="w-full mt-4" fullWidth>
                  <Typography className="text-white ml-3 ">Columns</Typography>
                  {/* <InputLabel>Select Field</InputLabel> */}
                  <TextField
                    className="bg-white rounded-full"
                    name="rows"
                    value={formData.rows}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Click to input rows"
                  />
                </FormControl>

                <FormControl className="w-full mt-4" fullWidth>
                  <Typography className="text-white ml-3 ">Rows</Typography>
                  {/* <InputLabel>Select Field</InputLabel> */}
                  <TextField
                    className="bg-white rounded-full"
                    name="columns"
                    value={formData.columns}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Click to input columns"
                  />
                </FormControl>
              </div>
            </div>
          </div>

          <Button
            // type="submit"
            variant="contained"
            // color="primary"
            className="p-3 w-full bg-[#2BDF27] flex justify-center gap-9 items-center text-base mb-6"
            // onClick={() => localStorage.setItem('type', 'CLIENT')}
            // className=' '
            onClick={postOutbound}
          >
            {isLoading && (
              <div class="flex items-center justify-center">
                <div class="border-t-4 border-white border-solid rounded-full animate-spin h-4 w-4"></div>
              </div>
            )}
            Create Rack
          </Button>
        </Card>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Store</TableCell>
              <TableCell>Rows</TableCell>
              <TableCell>Column</TableCell>
              <TableCell>Shelves</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="">
            {rack?.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="w-1/6">{row.name}</TableCell>
                <TableCell className="w-1/6">
                  {stores?.find((e) => e?.id === row?.storeId)?.name}
                </TableCell>
                <TableCell className="w-1/6">{row.rows}</TableCell>
                <TableCell className="w-1/6">{row.columns}</TableCell>
                <TableCell className="flex gap-1 flex-wrap w-full ">
                  {shelves
                    ?.filter((shelf) => shelf?.rackId === row.id)
                    ?.map((e) => (
                      <Chip label={e?.label} onDelete={handleDelete} />
                    ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Racks;

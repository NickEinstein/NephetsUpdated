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
import CategoryApi from "apis/CategoryApi";
import { useSnackbar } from "notistack";
import { UserApi } from "apis/UserApi";
import ReportsApi from "apis/ReportsApi";
import RackApi from "apis/RackApi";
import StoreApi from "apis/StoreApi";

const UserCreation = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [result, setResult] = React.useState(null);
  const [RackId, setRackId] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const getCategories = CategoryApi.useGetCategoryQuery({
    // id: formData.rack,
  });
  const categories = getCategories?.data;

  const getStoreProductsResult = ReportsApi.useGetAllProductsBalanceQuery({
    // RackId: formData.store,
    // Location,
  });
  //   const storeProducts = getStoreProductsResult?.data?.reverse()
  const storeProducts = getStoreProductsResult?.data
    ? [...getStoreProductsResult.data]?.reverse()
    : [];

  const getRacksResult = RackApi.useGetRackQuery({
    // RackId: formData.store,
    // Location,
  });
  //   const storeProducts = getStoreProductsResult?.data?.reverse()
  const racks = getRacksResult?.data;

  const getProductsInRacksResult = RackApi.useGetProductsByRackQuery({
    RackId,
    // RackId: formData.store,
    // Location,
  });
  const getStoreQueryResult = StoreApi.useGetStoresQuery({});
  const stores = getStoreQueryResult?.data || [];
  //   const storeProducts = getStoreProductsResult?.data?.reverse()
  const productsInRack = getProductsInRacksResult?.data;

  const [formData, setFormData] = React.useState({ rackId: "" });

  const [createRackMuation, createRackMutationResult] =
    RackApi.useProductRackMutation();

  const handleChange = (event, newValue) => {
    console.log(newValue);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangez = (event, newValue) => {
    console.log(newValue);
    setResult(newValue);
    // const { name, value } = event.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
  };

  const handleSubmit = (e) => {
    postOutbound();
    e.preventDefault();
    // Handle form submission with formData
  };

  const postOutbound = async () => {
    setIsLoading(true);
    let payload = {
      productId: result.id,
      rackId: formData?.rackId,
    };
    console.log(payload);
    try {
      setIsLoading(false);

      const data = await createRackMuation({ data: payload }).unwrap();
      enqueueSnackbar("Product successfully Linked to Rack", {
        variant: "success",
      });
      setResult(null);
    } catch (error) {
      console.log(error);
      setFormData();
      enqueueSnackbar(error?.data, "", {
        variant: "error",
      });
      setIsLoading(false);

      setResult(null);
      setFormData();
    }
  };

  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h4">
        Products in Rack
      </Typography>
      <div className=" gap-6">
        <Card className="px-8 py-4 w-full bg-black text-white rounded-2xl">
          <form className="flex flex-col gap-4  px-10" onSubmit={handleSubmit}>
            <div className="w-full mb-6 flex flex-col gap-4">
              <div className="w-full mt-6">
                <Typography
                  className="text-center font-bold text-white my-5"
                  variant="h5"
                >
                  Add Products to Rack
                </Typography>
                <div class="flex gap-6 items-center">
                  <div className="w-full">
                    <Typography>Product</Typography>
                    <Autocomplete
                      value={result}
                      className=" m-2"
                      disablePortal
                      onChange={(event, newValue) =>
                        // handleChangez(event, newValue)
                        setResult(newValue)
                      }
                      // id="combo-box-demo"
                      options={storeProducts?.map((e) => ({
                        label: e?.name,
                        id: e?.id,
                      }))}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    {/* <FormControl className="w-full" fullWidth>
                      <Select
                        className="bg-white w-full"
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                      >
                        {storeProducts?.map((e) => (
                          <MenuItem value={e?.id}>{e?.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}
                  </div>

                  <div className="w-full">
                    <div className="flex gap-4">
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
                            options={racks
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
                    </div>
                    {/* <Typography>Racks</Typography>
                    <FormControl className="w-full m-2" fullWidth>
                      <Select
                        className="w-full"
                        name="rackId"
                        value={formData?.rackId}
                        onChange={handleChange}
                      >
                        {racks?.map((e) => (
                          <MenuItem value={e?.id}>{e?.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full justify-start mt-5">
              <Button
                type="submit"
                variant="contained"
                // color="primary"
                className="p-3 w-full bg-[#2BDF27] flex justify-center gap-9 items-center text-base mb-6"
                // onClick={startDelivery}
                // onClick={() => localStorage.setItem('type', 'CLIENT')}
                // className=' '
                disabled={isLoading}
              >
                {isLoading && (
                  <div class="flex items-center justify-center">
                    <div class="border-t-4 border-white border-solid rounded-full animate-spin h-4 w-4"></div>
                  </div>
                )}
                Link Product to Rack
              </Button>
            </div>
          </form>

          {/* <div className="flex items-center mt-6 mb-3">
            
          
            <Button>Excel</Button>
            <Button classname='ml-4'>PDF</Button>
            
           
          </div> */}

          <Typography
            className="text-center font-bold text-white my-5"
            variant="h4"
          >
            View Products in Rack
          </Typography>

          <div className="w-full">
            <Typography className="mx-5 font-bold">Racks</Typography>
            <FormControl className="w-full m-2" fullWidth>
              {/* <InputLabel>Select Field</InputLabel> */}
              <Select
                className="w-1/3"
                name="rackId"
                value={RackId}
                onChange={(e) => setRackId(e.target.value)}
              >
                {racks?.map((e) => (
                  <MenuItem value={e?.id}>{e?.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="font-bold">
                  <TableCell className="font-bold text-base">#</TableCell>
                  <TableCell className="font-bold text-base">Product</TableCell>
                  <TableCell className="font-bold text-base">Rack</TableCell>
                  {/* <TableCell className="font-bold text-base">Code</TableCell>

                  <TableCell className="font-bold text-base">Balance</TableCell>
                  <TableCell className="font-bold text-base">
                    Reorder-level
                  </TableCell> */}

                  {/* <TableCell className="font-bold text-base">
                    Reorder Level
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {productsInRack?.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell>{row.rack}</TableCell>
                    {/* <TableCell>{row.code}</TableCell>
                    <TableCell>{row.balance}</TableCell>
                    <TableCell>{row.reOrderLevel}</TableCell> */}

                    {/* <TableCell>{row.reOrderLevel}</TableCell> */}
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

export default UserCreation;

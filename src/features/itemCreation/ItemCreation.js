import React, { useEffect, useState } from "react";
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
import ExportToExcel from "features/dashboard/ExportToExcel";
import InventoryApi from "apis/InventoryApi";

const UserCreation = () => {
  const [refreshD, setRefreshD] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const getCategories = CategoryApi.useGetCategoryQuery({
    // id: formData.rack,
  });
  const categories = getCategories?.data;

  const getStoreProductsResult = ReportsApi.useGetAllProductsBalanceQuery({
    refreshD,
    // RackId: formData.store,
    // Location,
  });

  //   const storeProducts = getStoreProductsResult?.data?.reverse()
  const storeProducts = getStoreProductsResult?.data
    ? [...getStoreProductsResult.data]?.reverse()
    : [];

  const getMeasuringUnitsResult = ReportsApi.useGetMeasuringUnitsQuery({
    // refreshD,
    // RackId: formData.store,
    // Location,
  });
  const MeasureUnits = getMeasuringUnitsResult?.data;

  const [formData, setFormData] = React.useState({
    categoryId: "",
    reOrderLevel: "",
    measureUnitId: "",
    name: "",
    unitPerPack: "",
  });

  const [searchitemHolder, setsearchitemHolder] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [clear, setClear] = React.useState(null);
  const [searchitemText, setsearchitemText] = React.useState("");
  const [createProductMuation, createProductMutationResult] =
    UserApi.useCreateProductMutation();

  const [createBarcodeMuation, createBarcodeMutationResult] =
    InventoryApi.useGenerateBarCodeMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    postOutbound();
    e.preventDefault();

    // Handle form submission with formData
  };

  const GenerateBarCode = async (item) => {
    // let payload = {
    //   ...formData,
    //   tagType: 1,
    //   allowSplitIssuance: true,
    //   allowPartialUtilisation: true,
    //   allowPartialRelease: true,
    //   isDeleted: false,
    //   maximumRequisition: 1000,
    //   enableRequisition: true,
    // };

    // console.log(payload);

    // alert('iii')

    try {
      const data = await createBarcodeMuation({
        data: item,
        path: item.id,
      }).unwrap();
      // TODO extra login
      // console.log(data.data);
      enqueueSnackbar("Barcode Created successfully", { variant: "success" });
      // setFormData({
      //   categoryId: "",
      //   reOrderLevel: "",
      //   measureUnitId: "",
      //   name: "",
      //   unitPerPack: "",
      // });
      // setRefreshD((orev)=>orev+1)
      // redirect();
    } catch (error) {
      enqueueSnackbar(error?.data?.message, "Failed to login", {
        variant: "error",
      });
    }
  };

  const postOutbound = async () => {
    let payload = {
      ...formData,
      tagType: 1,
      allowSplitIssuance: true,
      allowPartialUtilisation: true,
      allowPartialRelease: true,
      isDeleted: false,
      maximumRequisition: 1000,
      enableRequisition: true,
    };

    setIsLoading(true);

    try {
      if (storeProducts.find((e) => e?.name == formData.name)) {
        enqueueSnackbar("Name already exists", { variant: "error" });
        return;
      }


      if (
        !formData?.categoryId ||
        !formData?.reOrderLevel ||
        !formData?.measureUnitId ||
        !formData?.name ||
        !formData?.unitPerPack
      ) {
        enqueueSnackbar("Please make sure all fields are populated", {
          variant: "error",
        });
      setIsLoading(false);

        return;
      }

      const data = await createProductMuation({ data: payload }).unwrap();
      // TODO extra login
      // console.log(data.data);
      enqueueSnackbar("Created successfully", { variant: "success" });
      setFormData({
        categoryId: "",
        reOrderLevel: "",
        measureUnitId: "",
        name: "",
        unitPerPack: "",
      });
      setRefreshD((orev) => orev + 1);
      setIsLoading(false);
      setClear(null);

      // redirect();
    } catch (error) {
      enqueueSnackbar(error?.message, "Failed to login", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  const header = [
    "#",
    "Product",
    "Category",
    "Code",
    // "Status",
    "Balance",
    "reorderLevel",
  ];

  function filterListByArray(text) {
    // return originalList.filter(item =>
    setsearchitemText(text);
    let pp = storeProducts?.filter((array) =>
      array?.name?.toLowerCase()?.includes(text?.toLowerCase())
    );

    console.log(pp);

    setsearchitemHolder(pp);
    // );
  }

  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h4">
        Item Creation
      </Typography>
      <div className=" gap-6">
        <Card className="px-8 py-4 w-full bg-black text-white rounded-2xl">
          <form className="flex flex-col gap-4  px-10" onSubmit={handleSubmit}>
            <div className="w-full mb-6 flex flex-col gap-4">
              <div className="w-full mt-6">
                <div class="flex gap-6 items-center">
                  <div className="w-full">
                    <Typography>Product Category</Typography>
                    <FormControl className="w-full" fullWidth>
                      <Autocomplete
                        value={clear}
                        className="m-2"
                        disablePortal
                        onChange={
                          (event, newValue) =>
                            // handleChange(event, newValue)
                            {
                              setFormData({
                                ...formData,
                                categoryId: newValue?.id,
                              });
                              setClear(newValue);
                            }
                          // console.log(newValue)
                        }
                        // id="combo-box-demo"
                        options={(categories || [])?.map((e) => ({
                          label: e?.name,
                          id: e?.id,
                        }))}
                        sx={{ minWidth: 200 }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      {/* <Select
                        className="bg-white w-full"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                      >
                        {categories?.map((e) => (
                          <MenuItem value={e?.id}>{e?.name}</MenuItem>
                        ))}
                      </Select> */}
                    </FormControl>
                  </div>

                  <div className="w-full">
                    <Typography>Reorder Level</Typography>
                    <TextField
                      className="bg-white rounded-full"
                      // label="Field 6"
                      name="reOrderLevel"
                      value={formData.reOrderLevel}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-full ">
                  {/* <div className="w-full">
                    <Typography>Tag Type</Typography>
                    <FormControl className="w-full" fullWidth>
                      <InputLabel>Select Field</InputLabel>
                      <Select
                        className="bg-white w-full"
                        name="tagType"
                        value={formData.tagType}
                        //   onChange={handleChange}
                      >
                        <MenuItem value="1"> 1</MenuItem>
                        <MenuItem value="2"> 2</MenuItem>
                        <MenuItem value="3"> 3</MenuItem>
                      </Select>
                    </FormControl>
                  </div> */}
                </div>
                <div className="w-full">
                  {/* <Typography>Measure Unit Base</Typography> */}
                  {/* <TextField
                    className="bg-white rounded-full"
                    value={formData.measureUnitId}
                    onChange={handleChange}
                    fullWidth
                  /> */}

                  <div className="w-full">
                    <Typography>Measure Unit Base</Typography>
                    <FormControl className="w-full" fullWidth>
                      {/* <InputLabel>Select Field</InputLabel> */}
                      <Select
                        className="bg-white w-full"
                        name="measureUnitId"
                        value={formData.measureUnitId}
                        onChange={handleChange}
                      >
                        {MeasureUnits?.map((e) => (
                          <MenuItem value={e?.baseUnitId}>{e?.unit}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-full ">
                  <Typography>Name</Typography>
                  <TextField
                    className="bg-white rounded-full"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-full ">
                  <Typography>Unit Pack</Typography>
                  <TextField
                    className="bg-white rounded-full"
                    // label="Field 6"
                    name="unitPerPack"
                    value={formData.unitPerPack}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full justify-start mt-5">
              <Button
                type="submit"
                variant="contained"
                // color="primary"
                className="p-3 w-full bg-[#2BDF27] flex justify-center gap-9 items-center text-base mb-6"
                // onClick={() => localStorage.setItem('type', 'CLIENT')}
                // className=' '
              >
                {isLoading && (
                  <div class="flex items-center justify-center">
                    <div class="border-t-4 border-white border-solid rounded-full animate-spin h-4 w-4"></div>
                  </div>
                )}
                Save
              </Button>
            </div>
          </form>

          <div class="flex flex-between">
            <div className="flex items-center mt-6 mb-3">
              {/* <Button>Csv</Button> */}
              <ExportToExcel data={storeProducts} header={header} />
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
                  <TableCell className="font-bold text-base">Product</TableCell>
                  <TableCell className="font-bold text-base">
                    Category
                  </TableCell>
                  <TableCell className="font-bold text-base">Code</TableCell>

                  <TableCell className="font-bold text-base">Balance</TableCell>
                  <TableCell className="font-bold text-base">
                    Reorder-level
                  </TableCell>

                  <TableCell className="font-bold text-base">
                    Generate Bar Code
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(searchitemText.length > 0
                  ? searchitemHolder
                  : storeProducts
                )?.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.balance}</TableCell>
                    <TableCell>{row.reOrderLevel} </TableCell>

                    <TableCell>
                      <Button onClick={() => GenerateBarCode(row)}>
                        Generate Barcode
                      </Button>
                    </TableCell>
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

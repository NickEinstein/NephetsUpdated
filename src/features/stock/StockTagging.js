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

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Card, Divider, Typography } from "@mui/material";
import TaggingApi from "apis/TaggingApi";
import UserApi from "apis/UserApi";
import { useSnackbar } from "notistack";

const StockTagging = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = React.useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    selectField: "",
  });

  const [itemId, setItemId] = React.useState();
  const [receivingStoreId, setreceivingStoreId] = React.useState();
  const [unit, setunitId] = React.useState(0);
  const [deliveryItemId, setdeliveryItemId] = React.useState();

  const [taggingMuation, taggingMutationResult] =
    TaggingApi.useTaggingMutation();

  const getTaggingQueryResult = TaggingApi.useGetTaggingQuery({});
  const taggingResult = getTaggingQueryResult?.data;

  const getItemDetailQueryResult = TaggingApi.useGetItemDetailQuery({ itemId });
  const ItemDetail = getItemDetailQueryResult?.data;

  // getItemDetail

  const getStoreTaggingDetailQueryResult =
    UserApi.useGetStoreTaggingDetailQuery({
      deliveryItemId: ItemDetail?.id,
      unit,
    });
  const StoreTaggingDetailResult = getStoreTaggingDetailQueryResult?.data;

  console.log(StoreTaggingDetailResult);
  // setdeliveryItemId(ItemDetail.id)

  const data = [
    {
      id: 1,
      column1: "Value 1",
      column2: "Value 2",
      column3: "Value 3",
      column4: "Value 4",
      column5: "Value 5",
      column6: "Value 5",
    },
    {
      id: 2,
      column1: "Value 6",
      column2: "Value 7",
      column3: "Value 8",
      column4: "Value 9",
      column5: "Value 10",
      column6: "Value 5",
    },
    // Add more data as needed
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name == "productId") setItemId(value);
    if (name == "reccivingStoreId") {
      console.log(value);
      setreceivingStoreId(value);
    }
    // setreceivingStoreId
  };

  const handleSubmit = async (e) => {
    let payload = {
      deliveryItemId: ItemDetail?.id,
      quantity: StoreTaggingDetailResult?.quantity,
      storeId: +receivingStoreId,
      userId: 0,
      projectId: null,
      projectType: 1,
      taggingType: 2,
    };

    try {
      const data = await taggingMuation({ data: payload }).unwrap();
      // TODO extra login
      enqueueSnackbar("Logged in successful", { variant: "success" });
      // redirect();
    } catch (error) {
      enqueueSnackbar(error?.data?.message, "Failed to login", {
        variant: "error",
      });
    }
    // e.preventDefault();
    // Handle form submission with formData
  };
  const KeyValueRow = ({ label, value }) => {
    return (
      <div className="flex justify-between text-white bg-black ">
        <Typography className=" border-b-2 w-full px-3 py-1">
          {label}
        </Typography>
        <Typography
          className="w-full text-right border-b-2 px-3 py-1"
          variant=""
        >
          {value}
        </Typography>
      </div>
    );
  };
  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h4">
        Stock Tagging
      </Typography>
      <div className="flex gap-6">
        <Card title="" className="px-8 py-4 w-3/5 bg-black rounded-2xl pb-40">
          <div>
            <Typography className=" text-left text-white">
              Item & Store Detail
            </Typography>
            <Divider
              sx={{ color: "white" }}
              className="text-white bg-white mb-2"
            />
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <FormControl fullWidth>
                <label className="text-white">Item Detail</label>
                <Select
                  square
                  className="bg-white"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                >
                  {taggingResult?.deliveryItems?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <label className="text-white">Receiving Store</label>
                <Select
                  square
                  className="bg-white"
                  name="reccivingStoreId"
                  value={formData.productId}
                  onChange={handleChange}
                >
                  {taggingResult?.receivingStores?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </form>
          <div className="mt-4">
            <Typography className=" text-left text-white">
              Unit Specification
            </Typography>
            <Divider
              sx={{ color: "white" }}
              className="text-white bg-white mb-2"
            />
          </div>
          <div class="mt-12">
            <Typography className="text-white mb-1">
              No of Items to tag
            </Typography>
            <div className="flex gap-4 items-center ">
              <div className="text-white">
                <TextField
                  className="bg-white rounded-full"
                  // label="Field 1"
                  name="field1"
                  value={formData.field1}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Click to input Price"
                />
              </div>
              <div className="flex gap-3">
                <div
                  onClick={() => setunitId((prev) => prev + 1)}
                  className="border cursor-pointer border-green-500"
                >
                  <AddIcon className="text-green-500" />
                </div>{" "}
                {/* Plus icon */}
                <div
                  onClick={() => setunitId((prev) => prev - 1)}
                  className="border cursor-pointer border-red-500"
                >
                  <RemoveIcon className="text-red-500" />
                </div>{" "}
                {/* Minus icon */}
              </div>
              <div>
                <Button onClick={handleSubmit}>Create Stock</Button>
              </div>
            </div>
          </div>
        </Card>
        <Card
          title=""
          className="px-8 py-4 w-2/5 bg-black rounded-2xl text-white"
        >
          <div>
            <Typography variant="h6">Unit Details</Typography>
            <Divider className="bg-white mb-1"></Divider>
            <Divider className="bg-white mb-1"></Divider>
            <div>
              <KeyValueRow
                label="Unit Per Pack"
                value={StoreTaggingDetailResult?.unit}
              />
              <KeyValueRow
                label="Quantity"
                value={StoreTaggingDetailResult?.quantity}
              />
              <KeyValueRow
                label="Total Item"
                value={StoreTaggingDetailResult?.total}
              />
              {/* <KeyValueRow label="Email" value="johndoe@example.com" />
              <KeyValueRow label="Occupation" value="Software Engineer" /> */}
            </div>
          </div>

          <div className="mt-8">
            <Typography variant="h6">Item Details</Typography>
            <Divider className="bg-white mb-1"></Divider>
            <Divider className="bg-white mb-1"></Divider>
            <div>
              <KeyValueRow
                label="Produvt Name"
                value={ItemDetail?.productName}
              />
              {/* <KeyValueRow label="Unit Per Pack" value={ItemDetail?.baseUnit} /> */}
              <KeyValueRow
                label="Quantity Available"
                value={ItemDetail?.total}
              />
              <KeyValueRow label="Total Item" value={ItemDetail?.total} />
              {/* <KeyValueRow label="Email" value="johndoe@example.com" />
              <KeyValueRow label="Occupation" value="Software Engineer" /> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StockTagging;

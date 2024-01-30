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

const ConfirmRelease = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    shelfCode: "",
    productBarcode: "",
    quantity: "",
    comment: "",
    requestCode: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const [TaggingId, setTaggingId] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [RequestCode, setRequestCode] = React.useState();
  const [requestObj, setrequestObj] = React.useState();
  const [show, setShow] = React.useState(false);

  // StoreStocks

  const [stockConfirmReleaseMuation, stockConfirmReleaseMutationResult] =
    ReqApi.useConfirmReleaseMutation();

  const getRequestsQueryResult = ReqApi.useGetRequestQuery({
    TaggingId,
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

  const postOutbound = async (RequestCode) => {
    let payload = {
      requestId: RequestCode,
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

    setItems([...items, payload]);
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

  const catchRequestId = (row) => {
    setRequestCode(row.code);
    setrequestObj(row);
    console.log(row.code);
  };

  return (
    <div>
      <Typography className="text-center font-bold my-5" variant="h4">
        Material Acceptance
      </Typography>

      <Card className="p-5 bg-black text-white">
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
                    ?.filter((filtered) => filtered.status === 5)
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
                          Accept
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {show && (
            <div className="text-white mt-8 bg-black px-[20%]">
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
                    <p className="text-white mt-1 text-center">{e?.name}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white mt-1 ">{e?.quantity}</p>
                  </div>
                </div>
              ))}

              <Button
              className="mt-3 w-full p-3"
                onClick={() => {
                  postOutbound(requestObj?.id);
                }}
              >
                Accept
              </Button>
            </div>
          )}

          {/* requestsDetails */}
        </Paper>
      </Card>
    </div>
  );
};

export default ConfirmRelease;

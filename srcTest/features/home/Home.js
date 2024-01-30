import React, { useState } from "react";
import { useSnackbar } from "notistack";

import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BalanceInfo from "./BalanceInfo";
import {
  CancelOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import download from "images/aa/download.svg";
import TransactionRow from "./TransactionRow";
import UserApi from "apis/UserApi";
import LineChartExample from "./LineChartExample";
import { Card } from "antd";
import { useSpring, animated } from "react-spring";
import DateRangePicker from "./DateRangePicker";

function Home(props) {
  const [show, setshow] = React.useState(false);
  const [drop, setdrop] = React.useState(false);
  const [drop2, setdrop2] = React.useState(true);

  const styles = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? "translateX(0%)" : "translateX(100%)",
  });

  const styles2 = useSpring({
    opacity: drop ? 1 : 0,
    transform: drop ? "translateX(0%)" : "translateX(100%)",
  });

  const styles3 = useSpring({
    opacity: drop2 ? 1 : 0,
    transform: drop2 ? "translateX(0%)" : "translateX(100%)",
  });

  const getTransactionsResult = UserApi.useGetTransactionsQuery({});
  const Transactions = getTransactionsResult?.data;

  const getWalletsResult = UserApi.useGetWalletQuery({});
  const wallet = getWalletsResult?.data;

  const checkboxData = [
    { id: 1, label: "Successful" },
    { id: 2, label: "Pending" },
    { id: 3, label: "Failed" },
  ];

  const checkboxData2 = [
    { id: 1, label: "Stored Transactions" },
    { id: 2, label: "Get Tipped" },
    { id: 3, label: "Withdrawals" },
    { id: 4, label: "ChargeBack" },
    { id: 5, label: "Cash Back" },
    { id: 6, label: "Refer & Earn" },
  ];

  const [checkedItems, setCheckedItems] = useState(() => {
    const initialCheckedState = {};
    checkboxData2.forEach((item) => {
      initialCheckedState[item.id] = false;
    });
    return initialCheckedState;
  });

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const getCheckedItems = () => {
    return Object.entries(checkedItems)
      .filter(([_, isChecked]) => isChecked)
      .map(([id]) => {
        const selectedItem = checkboxData2.find(
          (item) => item.id === parseInt(id, 10)
        );
        return selectedItem ? selectedItem.label : null;
      })
      .filter(Boolean);
  };

  const [checkedItems2, setCheckedItems2] = useState(() => {
    const initialCheckedState = {};
    checkboxData.forEach((item) => {
      initialCheckedState[item.id] = false;
    });
    return initialCheckedState;
  });

  const handleCheckboxChange2 = (id) => {
    setCheckedItems2((prevCheckedItems2) => ({
      ...prevCheckedItems2,
      [id]: !prevCheckedItems2[id],
    }));
  };

  const getCheckedItems2 = () => {
    return Object.entries(checkedItems2)
      .filter(([_, isChecked2]) => isChecked2)
      .map(([id]) => {
        const selectedItem = checkboxData.find(
          (item) => item.id === parseInt(id, 10)
        );
        return selectedItem ? selectedItem.label : null;
      })
      .filter(Boolean);
  };

  return (
    <main className="w-full px-[8%] degular">
      <div className="flex items-start mt-12">
        <div className="w-full">
          <Typography className="text-sm degular mb-4">
            Available Balance
          </Typography>
          <div className="flex items-end  gap-6">
            <Typography className="text-3xl font-bold degular ">
              USD {wallet?.balance}
            </Typography>
            <Button className="p-3 bg-black text-white w-40">Withdraw</Button>
          </div>
          <div className="w-full h-72 mt-12">
            <div style={{ margin: "20px" }}>
              {/* <h1>Sinusoidal Line Chart (VCharts)</h1> */}
              <LineChartExample />
            </div>{" "}
          </div>
        </div>
        <aside className="w-1/4 gap-4 flex flex-col">
          <BalanceInfo header="Ledger Balance" price={wallet?.ledger_balance} />
          <BalanceInfo header="Total Payout" price={wallet?.total_payout} />
          <BalanceInfo header="Revenue" price={wallet?.total_revenue} />
          <BalanceInfo header="Pending Payout" price={wallet?.pending_payout} />
        </aside>
      </div>
      <div className="flex items-center justify-between mt-12">
        <div>
          <Typography variant="h5" className="font-bold">
            {Transactions?.length} Transactions
          </Typography>
          <Typography>Your transaction over the last 7 days</Typography>
        </div>

        <div className="">
          <div className="flex gap-3">
            <div
              onClick={() => setshow(!show)}
              className="flex items-center gap-2 p-2  px-4 cursor-pointer rounded-full bg-[#EFF1F6]"
            >
              <Typography>Filter</Typography>
              <KeyboardArrowDown />
            </div>
            <div className="flex items-center gap-2 p-2 px-4  rounded-full bg-[#EFF1F6]">
              <Typography>Export List</Typography>
              <img src={download} />
            </div>
          </div>
        </div>
        <animated.div
          style={styles}
          className={
            "right-0 top-0 flex justify-end fixed h-screen w-full bg-[#EFF1F6]/80"
          }
        >
          <Card className=" w-[30%] m-2 relative flex flex-col gap-4 justify-between">
            <div className="w-full">
              <div className="flex justify-between items-center my-4 w-full">
                <Typography variant="h5" className="font-bold">
                  Filter
                </Typography>
                <CancelOutlined
                  className="cursor-pointer"
                  onClick={() => {
                    setshow(false);
                  }}
                />
              </div>
              <div className="my-4">
                <DateRangePicker />
              </div>
              <ul className="flex justify-between items-center my-4">
                <Button className="p-2 px-6" variant="outlined">
                  Today
                </Button>
                <Button className="p-2 px-6" variant="outlined">
                  Last 7 days
                </Button>
                <Button className="p-2 px-6" variant="outlined">
                  This Month
                </Button>
                <Button className="p-2 px-6" variant="outlined">
                  3 Months
                </Button>
              </ul>
              <div className="relative my-4">
                <Typography variant="h6" className="font-bold">
                  Transaction Type
                </Typography>
                <div
                  onClick={() => {
                    setdrop(!drop);
                    setdrop2(!drop && false);
                  }}
                  className={`w-full border-2  rounded-2xl cursor-pointer min-h-16 py-1 flex gap justify-between items-center px-2  ${
                    drop && "border-black border-4 "
                  } ${getCheckedItems().length ? "bg-white" : ""}bg-[#EFF1F6]`}
                >
                  <div className="flex gap-2 flex-wrap">
                    {getCheckedItems().length < 1 ? (
                      <Typography>Select filters</Typography>
                    ) : (
                      getCheckedItems().map((e) => (
                        <div>
                          <Chip label={e} />
                        </div>
                      ))
                    )}
                  </div>
                  <div className="">
                    {!drop ? (
                      <KeyboardArrowDown style={{ fontSize: 40 }} />
                    ) : (
                      <KeyboardArrowUp style={{ fontSize: 40 }} />
                    )}
                  </div>
                </div>
                {drop && (
                  <animated.div style={styles2} class="div">
                    <Paper
                      elevation={2}
                      className="p-3 mt-2 rounded-2xl w-full  z-20"
                    >
                      <li className="flex flex-col">
                        {checkboxData2.map((item) => (
                          <FormControlLabel
                            key={item.id}
                            control={
                              <Checkbox
                                checked={checkedItems[item.id]}
                                onChange={() => handleCheckboxChange(item.id)}
                                color="primary"
                              />
                            }
                            label={item.label}
                          />
                        ))}
                      </li>
                    </Paper>
                  </animated.div>
                )}
              </div>
              <div className="relative my-4">
                <Typography variant="h6" className="font-bold">
                  Transaction Status
                </Typography>
                <div
                  onClick={() => {
                    setdrop(!drop2 && false);
                    setdrop2(!drop2);
                  }}
                  className={`w-full border-2  rounded-2xl cursor-pointer min-h-16 py-1 flex gap justify-between items-center px-2  ${
                    drop2 && "border-black border-4 "
                  } ${getCheckedItems2().length ? "bg-white" : ""}bg-[#EFF1F6]`}
                >
                  <div className="flex gap-2 flex-wrap">
                    {getCheckedItems2().length < 1 ? (
                      <Typography>Select filters</Typography>
                    ) : (
                      getCheckedItems2().map((e) => (
                        <div>
                          <Chip label={e} />
                        </div>
                      ))
                    )}
                  </div>
                  <div className="">
                    {!drop2 ? (
                      <KeyboardArrowDown style={{ fontSize: 40 }} />
                    ) : (
                      <KeyboardArrowUp style={{ fontSize: 40 }} />
                    )}
                  </div>
                </div>
                {drop2 && (
                  <animated.div style={styles3} class="div">
                    <Paper
                      elevation={2}
                      className="p-3 mt-2 rounded-2xl w-full  z-20"
                    >
                      <li className="flex flex-col">
                        {checkboxData.map((item) => (
                          <FormControlLabel
                            key={item.id}
                            control={
                              <Checkbox
                                checked={checkedItems2[item.id]}
                                onChange={() => handleCheckboxChange2(item.id)}
                                color="primary"
                              />
                            }
                            label={item.label}
                          />
                        ))}
                      </li>
                    </Paper>
                  </animated.div>
                )}
              </div>
            </div>

            <div className="flex gap-12 w-full absolute bottom-10">
              <Button
                variant="outlined"
                className="p-2 px-6 min-w-[80px] w-full"
              >
                Clear
              </Button>
              <Button className="p-2 px-6 w-full">Apply</Button>
            </div>
          </Card>
        </animated.div>
      </div>
      <div>
        {Transactions?.map((item) => (
          <TransactionRow items={item} />
        ))}
      </div>
    </main>
  );
}

export default Home;

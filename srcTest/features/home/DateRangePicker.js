// DateRangePicker.js
import React, { useState } from "react";
import { DatePicker } from "antd";
import { Typography } from "@mui/material";
// import 'antd/dist/antd.css'; // Import Ant Design styles

const DateRangePicker = () => {
  const [dateRange, setDateRange] = useState([]);

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  return (
    <div className="font-bold">
      <Typography variant="h6" className="my-2 font-bold">
        Date Range
      </Typography>
      <DatePicker.RangePicker value={dateRange} onChange={handleDateChange} />
    </div>
  );
};

export default DateRangePicker;

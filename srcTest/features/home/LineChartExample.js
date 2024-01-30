// LineChart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
// import generateSinusoidalData from './SinusoidalData';

const LineChartExample = () => {
  const generateSinusoidalData = (count) => {
    const data = [];
    for (let i = 0; i <= count; i++) {
      data.push({
        x: i,
        Apr: Math.sin(i / 3) * 10 + 10, // Adjust the formula based on your needs
      });
    }
    return data;
  };
  const data = generateSinusoidalData(30);
  return (
    <LineChart
      width={1000}
      height={320}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="x" />
      <YAxis />
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Apr" stroke="red" />
    </LineChart>
  );
};

export default LineChartExample;

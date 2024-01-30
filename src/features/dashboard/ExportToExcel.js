// import React from "react";
// import { CSVLink } from "react-csv";

// const ExportToExcel = () => {
//   const data = [
//     // Bold headers row
//     [
//       { value: "Name", style: { bold: true } },
//       { value: "Age", style: { bold: true } },
//       { value: "Country", style: { bold: true } },
//     ],
//     // Data rows
//     ["John Doe", 25, "USA"],
//     ["Jane Smith", 30, "Canada"],
//     // Add more rows as needed
//   ];

//   const excelTitle = "My Excel Sheet";

//   return (
//     <div>
//       <h1>Export Data to Excel</h1>
//       <table>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               {row.map((cell, cellIndex) => (
//                 <td key={cellIndex} style={cell.style}>
//                   {cell.value}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <CSVLink data={data} filename={"exported-data.csv"} target="_blank">
//         {excelTitle}
//       </CSVLink>
//     </div>
//   );
// };

// export default ExportToExcel;

import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
// import { Table, Button } from 'antd';
// import { ExcelOutlined } from '@ant-design/icons';
import * as XLSX from "xlsx";

const ExportToExcel = ({ data, header }) => {
  // Sample data for the Ant Design table
  let dataSource = [];
  // { key: "1", name: "John Doe", age: 25, country: "USA" },
  // { key: "2", name: "Jane Smith", age: 30, country: "Canada" },
  // Add more data as needed

  //   console.log(data);

  useEffect(() => {
    // console.log(data);
    dataSource = data;
  }, [data]);

  // Columns configuration for the Ant Design table
  const columns = header.map((e) => ({
    title: e?.toUpperCase(),
    dataIndex: e.toLowerCase(),
    key: e,
  }));

  // { title: "Age", dataIndex: "age", key: "age" },
  // { title: "Country", dataIndex: "country", key: "country" },
  // Add more columns as needed

  const exportToExcel = () => {
    // Create a worksheet with bold headers
    const ws = XLSX.utils.aoa_to_sheet([
      columns.map((column) => ({
        t: "s",
        v: column.title,
        s: { font: { bold: true } },
      })),
      ...dataSource.map((record) =>
        columns.map((column) => record[column.dataIndex])
      ),
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "exported-data.xlsx");
  };

  return (
    <div>
    

      <Button type="primary" onClick={exportToExcel}>
        Export to Excel
      </Button>
    </div>
  );
};

export default ExportToExcel;

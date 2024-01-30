import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import { RouteEnum } from "constants/RouteConstants";
import { useNavigate } from "react-router-dom";

const MyTable = ({ dataflex, onClick, buttonTitle, column, removeButton }) => {
  const redirect = useNavigate();
  const data = [
    {
      id: 1,
      column1: "Procurement of Industrial Laboratory Equipments",
      column2: "Williams Humphrey",
      column3: "Ministry of Industries",
      column4: "10.10.2023",
      column5: "Approved ",
    },
    {
      id: 2,
      column1: "Construction of Ultra-Modern Technical College",
      column2: "Rosemond Ogbekhilu",
      column3: "Ministry of Education",
      column4: "10.10.2023",
      column5: "Pending",
    },
    // Add more data rows as needed
  ];

  console.log(dataflex);

  const columns = column || [
    "Subject",
    "Description",
    "Initiated By",
    "MDA",
    "Date Created",
    "Status",
  ];

  return (
    <Paper elevation={2} className="mt-6 bg-white">
      <Table>
        <TableHead className="bg-primary-main text-white mb-2">
          <TableRow className="bg-red text-white mb-2">
            {columns?.map((column) => (
              <TableCell className="text-white mb-2" key={column}>
                {column}
              </TableCell>
            ))}
            <TableCell className="bg-red text-white mb-2">
              {"Actions"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="bg-white">
          {dataflex?.map((row) => (
            <TableRow className="bg-white" key={row.id}>
              {columns?.map((column, index) => (
                <TableCell key={column}>{row[`column${index + 1}`]}</TableCell>
              ))}
              <TableCell>
                {!removeButton && (
                  <div>
                    {row?.column7?.isEdppa ? (
                      <Button onClick={() => onClick(row.id, true, row)}>
                        {buttonTitle || "Action"}
                      </Button>
                    ) : (
                      <Button onClick={() => onClick(row.id, false, row)}>
                        {buttonTitle || "Action"}
                      </Button>
                    )}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default MyTable;

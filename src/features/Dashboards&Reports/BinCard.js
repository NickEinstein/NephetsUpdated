import React, { useState } from "react";
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
import { Card, Checkbox, TablePagination, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import UserApi from "apis/UserApi";
import ExportToExcel from "features/dashboard/ExportToExcel";
import useAuthUser from "hooks/useAuthUser";
import moment from "moment";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Hello, this is a PDF!</Text>
      </View>
    </Page>
  </Document>
);

const GlobalBin = () => {
  const user = useAuthUser();
  const [ProjectType, setProjectType] = useState(1);
  const [Location, setLocation] = useState(1);
  const [searchitemHolder, setsearchitemHolder] = React.useState([]);
  const [searchitemText, setsearchitemText] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();

  const getGlobalBinResult = UserApi.useGetBinCardQuery({
    ProjectType: 1,
    Location: user.locationId,
  });
  const globalBin = getGlobalBinResult?.data;

  const [formData, setFormData] = React.useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    selectField: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
  };

  function filterListByArray(text) {
    // return originalList.filter(item =>
    setsearchitemText(text);
    let pp = globalBin?.filter((array) =>
      array?.product?.toLowerCase()?.includes(text?.toLowerCase())
    );

    console.log(pp);

    setsearchitemHolder(pp);
    // );
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ... (other code remains unchanged)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <PDFDownloadLink document={<MyDocument />} fileName="fee_acceptance.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>

      <Typography className="text-center font-bold my-5" variant="h4">
        Bin Card
      </Typography>
      <div className="flex flex-col gap-6 items-start">
        <Card
          title=""
          className="px-8 py-4 w-full bg-black rounded-2xl flex flex-col gap-6 items-start"
        >
          {/* <Button className="bg-red-500 text-white flex">
            Delete Selected Items
          </Button> */}

          <div class="flex-between items-center w-full">
            <div className="flex items-center">
              {/* {/* <Button>Csv</Button> */}
              <ExportToExcel
                data={globalBin}
                header={[
                  "#",
                  "Product",
                  "Code",
                  "Location",
                  "GM",
                  "Special",
                  "FFM",
                  "Non-Technical",
                ]}
              />
              {/* <Button>Excel</Button> */}
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
                  <TableCell className="font-bold text-base">Code</TableCell>
                  <TableCell className="font-bold text-base">
                    Location
                  </TableCell>
                  <TableCell className="font-bold text-base">
                    Balance Forward
                  </TableCell>
                  <TableCell className="font-bold text-base">In</TableCell>
                  <TableCell className="font-bold text-base">Out</TableCell>
                  <TableCell className="font-bold text-base">Balance</TableCell>
                  <TableCell className="font-bold text-base">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(searchitemText.length > 0 ? searchitemHolder : globalBin)
                  ?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  ?.map((row, idx) => (
                    <TableRow key={row.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{row.product}</TableCell>
                      <TableCell>{row.requestCode}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.bf}</TableCell>
                      <TableCell>{row.in}</TableCell>
                      <TableCell>{row.out}</TableCell>
                      <TableCell>{row.balance}</TableCell>
                      <TableCell>
                        {moment(row.dateCreated).format("llll")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div class="bg-white w-full">
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={
                (searchitemText.length > 0 ? searchitemHolder : globalBin)
                  ?.length
              }
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>

          {/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
          </TableHead>
          <TableBody>
            {(searchitemText.length > 0
              ? searchitemHolder
              : globalBin
            )
             
              .map((row, idx) => (
                <TableRow key={row.id}>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}

          {/* ... (other code remains unchanged) */}
          {/* </div> */}

          {/* <div className="flex items-center mt-12 self-end">
            <Button>First</Button>
            <Button>Prev</Button>
            <Button>Next</Button>
            <Button>Last</Button>
          </div> */}
        </Card>
      </div>
    </div>
  );
};

export default GlobalBin;

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import "../../screens/common.css";
import api from "../../api/users";

const Dashboard = () => {
  const [ReservedList, setUservedList] = useState([]);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const getAllReservedList = async () => {
    const userID = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    const response = await api.get("/reservation");
    if (userRole === "admin") {
      if (response.status == 200) {
        if (response.data.length > 0) {
          // setstations(response.data)
          setUservedList(response.data);
          console.log("frgvbfbghn", response.data);
        }
      }
    } else {
      if (response.status == 200) {
        if (response.data.length > 0) {
          let reservations = response.data.filter(
            (item) => item.userId === userID
          );
          if (reservations && reservations.length) {
            setUservedList(reservations);
          }
        }
      }
    }
  };
  useEffect(() => {
    getAllReservedList();
  }, []);
  const onDelete = async (id) => {
    const response = await api.delete(`/reservation/${id}`);
    if (response.status == 200) {
      window.location.reload();
    }
  };
  return (
    <DrawerHeader>
      <TableContainer component={Paper}>
        <Table aria-label="caption table">
          <TableHead className="tblwapper">
            <TableRow>
              <TableCell className="tbltitle tboldttl">Source</TableCell>
              <TableCell className="tbltitle tboldttl" align="center">
                Destination
              </TableCell>
              <TableCell className="tbltitle tboldttl" align="right">
                Date
              </TableCell>
              <TableCell className="tbltitle tboldttl" align="right">
                &nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ReservedList.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="tbltitle" component="th" scope="row">
                  {row.from}
                </TableCell>
                <TableCell className="tbltitle" align="center">
                  {row.to}
                </TableCell>
                <TableCell className="tbltitle" align="right">
                  {row.date}
                </TableCell>
                <TableCell className="tbltitle" align="right">
                  <Button onClick={() => onDelete(row.id)} variant="outlined">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DrawerHeader>
  );
};

export default Dashboard;

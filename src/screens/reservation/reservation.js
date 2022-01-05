import * as React from "react";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import "../../screens/common.css";
import api from "../../api/users";

const Reservation = () => {
  const [fromStation, setFromStation] = React.useState("");
  const [toStation, setToStation] = React.useState("");

  const handleChangeFrom = (event, value) => {
    setFromStation(value.label);
  };
  const handleChangeTo = (event, value) => {
    setToStation(value.label);
  };
  const [date, setDate] = useState(new Date());
  const [stations, setstations] = useState([]);

  const dateHandleChange = (newValue) => {
    setDate(newValue);
  };
  const getAllStation = async () => {
    const response = await api.get("/station");
    if (response.status == 200) {
      if (response.data.length > 0) {
        setstations(response.data);
      }
    }
  };
  useEffect(() => {
    getAllStation();
  }, []);
  const onSubmit = async () => {
    const userID = localStorage.getItem("userId");
    const payload = {
      id: uuidv4(),
      from: fromStation,
      to: toStation,
      date: date,
      userId: userID,
    };
    if (fromStation === toStation) {
      toast.warning("Source and Destination cannot be same");
    } else {
      const request = await api.post("/reservation", payload);
      if (request.status == 201) {
        setFromStation("");
        setToStation("");
        setDate(new Date());
        toast.success("Reserved Successfully");
      }
    }
  };
  return (
    <>
      <div className="WapperDiv">
        <FormControl sx={{ m: 1, minWidth: 320 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={stations}
            value={fromStation}
            onChange={handleChangeFrom}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Source" />}
          />
        </FormControl>
        <label className="to-lbl">to</label>
        <FormControl sx={{ m: 1, minWidth: 320 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={stations}
            sx={{ width: 300 }}
            value={toStation}
            onChange={handleChangeTo}
            renderInput={(params) => (
              <TextField {...params} label="Destination" />
            )}
          />
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack className="datebtn">
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={(value) => dateHandleChange(value)}
              minDate={new Date()}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <Stack className="serchbtn">
          <Button
            onClick={() => onSubmit()}
            className="btn-search"
            style={{ padding: "13px 70px" }}
            variant="outlined"
            disabled={!fromStation || !toStation || !date ? true : false}
          >
            Submit
          </Button>
        </Stack>
      </div>
      <ToastContainer />
    </>
  );
};
export default Reservation;

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { useState } from 'react';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import { alldata } from './Data';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [Data, setData] = useState(alldata)
  const [showmodel, setshowmodel] = useState(props.call)
  const [name, setname] = useState()
  const [description, setdescripton] = useState()
  const [priority, setpriority] = useState()
  const [date, setdate] = useState()
  const [error, setError] = useState(false);
  const [newdate, setnewdate] = useState(new Date);



  const currentDate = new Date();
  const oldDate = new Date(date);
  const timeDiff = oldDate - currentDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hoursDiff = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutesDiff = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
  const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);
  const atime = daysDiff+ " Days  , " + hoursDiff + ":" + minutesDiff + ":" + secondsDiff;
  
  const closemodel = () => {
    props.set(false);
  };

  const savemodel = (e) => {
    e.preventDefault();
    // props.set(false);  

  //object creacte
    var gid = Math.floor(Math.random() * 100 + 1).toString(); 
    // console.log(id);
    if (!name || !description || !date || !priority) {
      setError(true); 
    } 
    else {
  let data = {
    id:gid,
    name: name,
    description: description,
    newdate:newdate,
    date: date,
    daysDiff: daysDiff,
    atime: atime,
    priority: priority
  }
  setname('');
  setdescripton('');
  setdate('');
  setnewdate('');
  setpriority('');
  setError(false);
  props.add(data)
  props.set(false); 
    };
};
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
    errors.description = "Required";
    errors.date = "Required";
    errors.priority = "Required";
  }
  return errors;
};

// Formik configuration
const formik = useFormik({
  initialValues: {
    name: "",
    description: "",
    date: "",
    daysDiff: "",
   priority: "",
  },
  validate,
  onClick: (values) => {
    // Handle form submission
    console.log(values);
  }
});

return (
  <div>
   {showmodel && (
    <Modal
      open={props.call}
      onClose={props.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <CloseRoundedIcon onClick={closemodel} style={{cursor: 'pointer',marginLeft:380}} />
        <h1 style={{paddingBottom:0,marginLeft:100,marginTop:0}}>backmodel</h1>
        <TextField
          required
          id="title"
          label="name"
          variant="standard"
          value={name}
          onChange={(e) => setname(e.target.value)}
          error={error && !name}
          helperText={error && !name ? "entername Error" : ""}
        />
        <TextField
          id="standard-multiline-static"
          label="description"
          multiline
          rows={2}
          variant="standard"
          onChange={(e) => setdescripton(e.target.value)}
          error={error && !description}
          helperText={error && !description ? "enterdescription Error" : ""}
        />
        <TextField
          id="datetime-local"
          label="Select Date & Time"
          type="datetime-local"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={(e) => setdate(e.target.value)}
          error={error && !date}
          helperText={error && !date ? "enterdate Error" : ""}
        />


        <FormControl sx={{ m: 1, width: "40%" }}>
          <InputLabel id="standard-required" variant="standard">
            Select
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            value={priority} onChange={(e)=>setpriority(e.target.value)}   
            error={error && !priority}
            helperText={error && !priority ? "enterprioity Error" : ""}       >
            <MenuItem value={1}>
              <Radio checked={true} color="success" size="small" />
            </MenuItem>
            <MenuItem value={2}>
              <Radio checked={true} color="error" size="small" />
            </MenuItem>
            <MenuItem value={3}>
              <Radio checked={true} color="default" size="small" />
            </MenuItem>
          </Select>
        </FormControl>
        <Stack spacing={1} direction="row" paddingRight={3} marginLeft={15} marginTop={2}>
          <Button variant="contained" color="info" size='large' onClick={savemodel} >Save</Button>
          <Button variant="contained" color="info" size='large' onClick={closemodel}>cencel</Button>
        </Stack>
      </Box>
    </Modal>
    )}
  </div>
);
}
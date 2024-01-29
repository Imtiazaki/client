import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";
import { useState } from "react";
import { addForum } from "../axios/ForumAxios";
import axios from "axios";
import Link from "@mui/material/Link";

const actions = [];
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

export default function AddForum() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const [form, setForm] = useState({
    user_id: "" + userId,
    title: "",
    body: ""
  });
  const cekToken = (token) => {
    return !token ? (
      <Link href={`/login`} variant="body2">
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
      </SpeedDial>
      </Link>
    ) : (
      <SpeedDial
        onClick={() => handleOpen()}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
      </SpeedDial>
    )
  };

  const URL = 'http://localhost:8000/api/forum'
  const submitHandler = (e) => {
    axios.post(URL, form)
    handleClose();
  };
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      { cekToken(token)}
      <div>
      <Button onClick={cekToken(token)}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
            What's the discussion ?
          </Typography>
          <div>
        <TextField
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        fullWidth
          id="outlined-multiline-flexible"
          label="Title"
          multiline
          maxRows={4}
          sx={{my : 1}}
        />
        <TextField
        onChange={(e) => setForm({ ...form, body: e.target.value })}
        fullWidth
          id="outlined-multiline-static"
          label="Body"
          multiline
          rows={4}
        />
      </div>
      <Grid container justify="flex-end">
      <Button 
      onClick={() => submitHandler()}
      sx={{my: 1}} variant="contained">Post</Button>
      </Grid>
        </Box>
      </Modal>
    </div>
    </Box>
  );
}

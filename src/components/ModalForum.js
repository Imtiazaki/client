import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addForum } from "../axios/ForumAxios";

function ModalForum() {
    const [form, setForm] = useState({
        idForum: 666,
        nomorInduk: 1001,
        nama: "Anonymous",
        title: "",
        komentar: "",
        profile: "",
      });
    
      const navigation = useNavigate();
    
      const submitHandler = (e) => {
        console.log(form);
        addForum(form);
        navigation("/forum");
      };
  return (
<Box
      component="form"
      sx={{ maxWidth: "100%", m: 1 }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          disabled
          id="outlined-disabled"
          label="Nama"
          defaultValue="Anonymous"
          sx={{ m: 1 }}
        />
        <TextField
          onChange={(e) => setForm({ ...form, nomorInduk: e.target.value })}
          disabled
          id="outlined-disabled"
          label="NIM/NIP*"
          defaultValue="1001"
          sx={{ m: 1, ml: 2}}
        />
      </div>
      <div>
        <TextField
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          fullWidth
          sx={{ m: 1 }}
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          onChange={(e) => setForm({ ...form, komentar: e.target.value })}
          fullWidth
          sx={{ m: 1 }}
          id="outlined-multiline-static"
          label="Comment"
          multiline
          rows={4}
          defaultValue=""
          width="100%"
        />
      </div>
      <div>
        <Button
          type="submit"
          fullWidth
          sx={{ m: 1 }}
          variant="outlined"
          onClick={() => submitHandler()}
        >
          Submit
        </Button>
      </div>
    </Box>
  )
}

export default ModalForum

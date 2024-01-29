import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ButtonLogout() {
  const token = localStorage.getItem("token");
  const logoutHandler = async () => {
    
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post("http://localhost:8000/api/logout").then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      window.location.reload();
    });
  };
  return (
    <Stack spacing={2} direction="row">
      <Button
        onClick={logoutHandler}
        variant="outlined"
        sx={{ color: "white" }}
      >
        Logout
      </Button>
    </Stack>
  );
}

export default ButtonLogout;

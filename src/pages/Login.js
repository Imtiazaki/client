import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useHistory from "react-router";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //define state validation
  const [validation, setValidation] = useState([]);
  const navigation = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append("username", username);
    formData.append("password", password);

    //send data to server
    await axios
      .post("http://localhost:8000/api/login", formData)
      .then((response) => {
        //set token on localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("username", response.data.user.username);

        //redirect to dashboard
        navigation("/");
        window.location.reload();
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data);
      });
  };
  useEffect(() => {
    if(localStorage.getItem('token')) {
       navigation(-1);
    }
}, []);
  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <hr />
              {validation.message && (
                <div className="alert alert-danger">{validation.message}</div>
              )}
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan Username"
                  />
                </div>
                {validation.username && (
                  <div className="alert alert-danger">
                    {validation.username[0]}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Password"
                  />
                </div>
                {validation.password && (
                  <div className="alert alert-danger">
                    {validation.password[0]}
                  </div>
                )}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

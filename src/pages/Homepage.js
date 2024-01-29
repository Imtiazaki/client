import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ForumContent from '../components/ForumContent';
import Grid from '@mui/material/Grid';
import ButtonLogin from '../components/buttons/ButtonLogin';
import AddForum from '../components/AddForum';
import '../css/AddForum.css';
import { Route, Routes } from "react-router-dom";
import ForumDetails from '../components/ForumDetails';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react';
import ButtonLogout from '../components/buttons/ButtonLogout';
import Link from "@mui/material/Link";


export default function Homepage() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const cekToken = (token) => {
    return !token ? <ButtonLogin/> : <ButtonLogout/>
  }

    //token
  

    //function "fetchData"
/*     const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/user')
        .then((response) => {
            //set response user to state
            setUser(response.data);
        })
    }
    fetchData(); */
    //
  return (
    <Grid container spacing={2}>
      <Grid xs={4}>
  </Grid>
    <Box
    align="center"
      sx={{ width: '33%' }}>
          <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{my: 2, bgColor: 'black'}}>
        <Toolbar>
        <Link href={`/`} variant="body2">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Wha!Forum
          </Typography>
          {cekToken(token)}
        </Toolbar>
      </AppBar>
    </Box>
    <BrowserRouter>
    <Routes>
        <Route path="/forum/:id" element={<ForumDetails />}></Route>
      </Routes>
      <Routes>
        <Route path="/" element={<ForumContent />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      </BrowserRouter>
    </Box>
    <div id="addButton">
        <AddForum/>
        
        </div>
    <Grid xs={4}>
  </Grid>
    </Grid>
  );
}

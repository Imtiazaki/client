import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Homepage from "./pages/Homepage";
import { useState, useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ForumDetails from "./components/ForumDetails";

function App() {

  return (
    <div className="main-page">
      <Homepage />
    </div>
  );
}

export default App;

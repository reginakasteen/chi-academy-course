import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import { Box } from "@mui/material";
import Heroes from "./pages/Heroes.jsx";
import NoPageFound from "./components/NoPageFound.jsx";

const App = () => {

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Sidebar/>
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/heroes" element={<Heroes />} />
            <Route path="/heroes/:id" element={<Heroes />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;

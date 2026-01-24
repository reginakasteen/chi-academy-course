import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import { Box } from "@mui/material";
import Heroes from "./pages/Heroes";
import NoPageFound from "./components/NoPageFound";

const App: React.FC = () => {

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

import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import { Box } from "@mui/material";
import Heroes from "./pages/Heroes";
import NoPageFound from "./components/NoPageFound";
import Wrapper from "./components/Wrapper";

const App: React.FC = () => {

  return (
    <Router basename="/chi-academy-course">
      <Box sx={{ display: "flex" }}>
        <Sidebar/>
        <Wrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/heroes" element={<Heroes />} />
            <Route path="/heroes/:id" element={<Heroes />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </Wrapper>
      </Box>
    </Router>
  );
};

export default App;

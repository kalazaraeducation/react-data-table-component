import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./pages/Navbar";
import ExpandedRows from "./pages/ExpandedRows";
import RemotePagination from "./pages/RemotePagination";
import Filtering from "./pages/Filtering";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/expanded-rows" element={<ExpandedRows />} />
        <Route path="/remote-pagination" element={<RemotePagination />} />
        <Route path="/filtering" element={<Filtering />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

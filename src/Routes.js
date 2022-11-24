import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./pages/Navbar";
import UserProfile from "./pages/UserProfile";
import DependentQueries from "./pages/DependentQueries";
import PaginatedQueries from "./pages/PaginatedQueries";
import InfiniteQueries from "./pages/InfiniteQueries";
import MutationQueries from "./pages/MutationQueries";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/single-user-data/:userId" element={<UserProfile />} />
        <Route path="/dependent-queries" element={<DependentQueries />} />
        <Route path="/paginated-queries" element={<PaginatedQueries />} />
        <Route path="/infinite-queries" element={<InfiniteQueries />} />
        <Route path="/mutation-queries" element={<MutationQueries />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

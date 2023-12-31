import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "../pages/Create";
import Contact from "../pages/Contact";

import Wallet from "../pages/Wallet";
import ModelDetails from "../pages/AI_Model_Details";
import ModelOwned from "../pages/ModelOwned";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/market" element={<Market />} />
      <Route path="/create" element={<Create />} />
      <Route path="/modelsowned" element={<ModelOwned />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/market/:id" element={<ModelDetails />} />
    </Routes>
  );
};

export default Routers;

import LoginScreen from "./LoginScreen/loginScreen";
import HomeScreen from "./Dasboard/HomeScreen";
import NewCustomer from "./FinTech/NewCustomer";
import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NewCustomer />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="home" element={<HomeScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

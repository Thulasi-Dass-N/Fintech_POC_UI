import React from "react";
import HomeScreen from "./Dasboard/HomeScreen";
import NewCustomer from "./FinTech/NewCustomer";
import LoginScreen from "./LoginScreen/loginScreen";

import { Navigate, Route, Routes } from "react-router-dom";
import Loan from "./FinTech/Loan";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NewCustomer />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="home" element={<HomeScreen />} />
      <Route path="loan" element={<Loan />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

import React, {  } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./Screens/appRoutes";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  // const { apiUrl, setapiUrl } = useContext(AppContext);


  return (
    // <AppContextProvider>
    <Routes>
      <Route path="/*" element={<AppRoutes />} />
    </Routes>
    // </AppContextProvider>
  );
};

export default App;

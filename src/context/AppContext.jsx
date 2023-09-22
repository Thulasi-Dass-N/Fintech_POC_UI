import React, { createContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_URL, API_KEY } from "../Constant/constant";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const apiEndpointIp = {
    ip_port: DEFAULT_URL,
    api_key: API_KEY,
  };
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : {}
  );
  const [account, setAccount] = useState(
    localStorage.getItem("account")
      ? JSON.parse(localStorage.getItem("account") || "")
      : {}
  );
  const [apiUrl, setapiUrl] = useState(
    localStorage.getItem("apiUrl")
      ? JSON.parse(localStorage.getItem("apiUrl") || "")
      : apiEndpointIp
  );
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem("acc", JSON.stringify(account));
  }, [account]);

  useEffect(() => {
    localStorage.setItem("apiUrl", JSON.stringify(apiUrl));
  }, [apiUrl]);
  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          user,
          setUser,
          account,
          setAccount,
          apiUrl,
          setapiUrl,
        }),
        [user, setUser, account, setAccount, apiUrl, setapiUrl]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

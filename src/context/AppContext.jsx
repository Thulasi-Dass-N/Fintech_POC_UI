import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_URL,
  API_KEY,
  FIN_API_KEY,
  FIN_DEFAULT_URL,
} from "../Constant/constant";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const apiEndpointIp = {
    ip_port: DEFAULT_URL,
    api_key: API_KEY,
  };
  const fintechAPI = {
    ip_port: FIN_DEFAULT_URL,
    api_key: FIN_API_KEY,
  };

  // user Details
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : {}
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // account for transaction repeat check

  const [account, setAccount] = useState(
    localStorage.getItem("account")
      ? JSON.parse(localStorage.getItem("account") || "")
      : {}
  );
  useEffect(() => {
    localStorage.setItem("acc", JSON.stringify(account));
  }, [account]);

  // api url
  const [apiUrl, setapiUrl] = useState(
    localStorage.getItem("apiUrl")
      ? JSON.parse(localStorage.getItem("apiUrl") || "")
      : apiEndpointIp
  );

  // useEffect(() => {
  //   localStorage.setItem("apiUrl", JSON.stringify(apiUrl));
  // }, [apiUrl]);

  useEffect(() => {
    const oldUrl = localStorage.getItem("apiUrl");
    if (oldUrl) {
      const data = JSON.parse(oldUrl || "{}");
      if (data.ip_port !== apiUrl.ip_port || data.api_key !== apiUrl.api_key) {
        window.location.reload();
      }
    }
    localStorage.setItem("apiUrl", JSON.stringify(apiUrl));
  }, [apiUrl]);

  // fintech api url.....

  const [finApiUrl, setFinApiUrl] = useState(
    localStorage.getItem("finApiUrl")
      ? JSON.parse(localStorage.getItem("finApiUrl") || "")
      : fintechAPI
  );

  // useEffect(() => {
  //   localStorage.setItem("finApiUrl", JSON.stringify(finApiUrl));
  //   // window.location.reload();
  // }, [finApiUrl]);

  useEffect(() => {
    const oldUrl = localStorage.getItem("finApiUrl");
    if (oldUrl) {
      const data = JSON.parse(oldUrl || "{}");
      if (
        data.ip_port !== finApiUrl.ip_port ||
        data.api_key !== finApiUrl.api_key
      ) {
        window.location.reload();
      }
    }
    localStorage.setItem("finApiUrl", JSON.stringify(finApiUrl));
  }, [finApiUrl]);

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
          finApiUrl,
          setFinApiUrl,
        }),
        [
          user,
          setUser,
          account,
          setAccount,
          apiUrl,
          setapiUrl,
          finApiUrl,
          setFinApiUrl,
        ]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

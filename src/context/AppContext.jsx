import React, { createContext, useEffect, useMemo, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : {}
  );
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          user,
          setUser,
        }),
        [user, setUser]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

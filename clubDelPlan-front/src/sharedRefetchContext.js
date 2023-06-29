import React, { createContext, useState } from "react";

export const SharedRefetchContext = createContext();

export const SharedRefetchProvider = ({ children }) => {
  const [refetch, setRefetch] = useState(false);

  const triggerRefetch = () => {
    setRefetch((prevState) => !prevState);
  };

  return (
    <SharedRefetchContext.Provider value={{ refetch, triggerRefetch }}>
      {children}
    </SharedRefetchContext.Provider>
  );
};

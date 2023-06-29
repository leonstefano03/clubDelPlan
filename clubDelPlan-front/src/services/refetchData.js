import React, { useContext } from "react";
import { SharedRefetchContext } from "../sharedRefetchContext";

const refetchData = () => {
  return useContext(SharedRefetchContext);
};

export default refetchData;

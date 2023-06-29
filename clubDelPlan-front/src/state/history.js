import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      return action.payload;
    },
  },
});

export const { setHistory } = historySlice.actions;
export default historySlice.reducer;

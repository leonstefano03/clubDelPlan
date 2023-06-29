import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setPlans: (state, action) => {
      return action.payload;
    },
    removePlan: (state, action) => {
      let newState = { ...state };
      newState = newState.filter((item) => item._id !== action.payload);
      return newState;
    },
  },
});

export const { setPlans, removePlan } = plansSlice.actions;
export default plansSlice.reducer;

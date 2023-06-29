import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  email: null,
  username: null,
  last_name: null,
  email: null,
  birthdate: null,
  phone: null,
  profile_img: null,
  plans: [],
  history: [],
  preferences: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    updateUser: (state, action) => {
      let newState = { ...state };
      newState[action.payload.key] = action.payload.value;
      return newState;
    },
    clearUser: () => initialState,
    setUserPlans: (state, action) => {
      let newState = { ...state };
      newState.plans = action.payload;
      return newState;
    },
    setPlanHistory: (state, action) => {
      let newState = { ...state };
      newState.history = action.payload;
      return newState;
    },
    setPreferences: (state, action) => {
      let newState = { ...state };
      newState.preferences = action.payload;
      return newState;
    },
  },
});

export const {
  setUser,
  updateUser,
  clearUser,
  setUserPlans,
  setPlanHistory,
  setPreferences,
} = userSlice.actions;
export default userSlice.reducer;

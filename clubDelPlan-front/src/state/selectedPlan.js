import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  title: null,
  description: null,
  location: null,
  img: null,
  event_date: null,
  created_at: null,
  min_age: null,
  max_age: null,
  min_to_pay: null,
  total_to_pay: null,
  deadline_to_pay: null,
  link_to_pay: null,
  category: null,
  start_time: null,
  end_time: null,
  comments: [],
  organizer: {},
  ended: false,
  private: false,
};

const selectedPlanSlice = createSlice({
  name: "selectedPlan",
  initialState,
  reducers: {
    setSelectedPlan: (state, action) => {
      return action.payload;
    },
    updateSelectedPlan: (state, action) => {
      let newState = { ...state };
      newState[action.payload.key] = action.payload.value;
      return newState;
    },
    setOrganizer: (state, action) => {
      let newState = { ...state };
      newState.organizer = action.payload;
      return newState;
    },
    clearSelectedPlan: (state, action) => {
      return initialState;
    },
    setComments: (state, action) => {
      let newState = { ...state };
      newState.comments = newState.comments.concat([action.payload]);
      return newState;
    },
  },
});

export const {
  setSelectedPlan,
  updateSelectedPlan,
  setOrganizer,
  setComments,
  clearSelectedPlan,
} = selectedPlanSlice.actions;
export default selectedPlanSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  address: null,
  birthdate: null,
  email: null,
  first_name: null,
  last_name: null,
  password: null,
  phone: null,
  profile_img: null,
  username: null,
};

const selectedContactSlice = createSlice({
  name: "selectedContact",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => action.payload,
  },
});

export const { setSelectedContact } = selectedContactSlice.actions;
export default selectedContactSlice.reducer;

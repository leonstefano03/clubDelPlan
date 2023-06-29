import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => action.payload,
  },
});

export const { setContacts } = contactsSlice.actions;
export default contactsSlice.reducer;

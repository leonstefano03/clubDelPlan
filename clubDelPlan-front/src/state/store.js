import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import selectedPlanReducer from "./selectedPlan";
import plansReducer from "./plans";
import contactsReducer from "./contacts";
import selectedContactReducer from "./selectedContact";
import historyReducer from "./history";

const reducers = combineReducers({
  user: userReducer,
  plans: plansReducer,
  selectedPlan: selectedPlanReducer,
  contacts: contactsReducer,
  selectedContact: selectedContactReducer,
  history: historyReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;

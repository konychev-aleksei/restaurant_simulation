import { combineReducers } from "redux";
import tablesSlice from "./slices/tables";
import clientsSlice from "./slices/clients";
import waitersSlice from "./slices/waiters";

export const rootReducer = combineReducers({
  tables: tablesSlice,
  clients: clientsSlice,
  waiters: waitersSlice
});

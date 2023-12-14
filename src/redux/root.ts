import { combineReducers } from "redux";
import tablesSlice from "./slices/tables";
import clientsSlice from "./slices/clients";
import waiterSlice from "./slices/waiter";

export const rootReducer = combineReducers({
  tables: tablesSlice,
  clients: clientsSlice,
  waiter: waiterSlice
});

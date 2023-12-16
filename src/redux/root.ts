import { combineReducers } from "redux";
import tablesSlice from "./slices/tables";
import clientsSlice from "./slices/clients";
import waiterSlice from "./slices/waiter";
import configSlice from "./slices/config";

export const rootReducer = combineReducers({
  tables: tablesSlice,
  clients: clientsSlice,
  waiter: waiterSlice,
  config: configSlice
});

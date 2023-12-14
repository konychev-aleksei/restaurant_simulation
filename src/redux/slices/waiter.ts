import { createSlice } from "@reduxjs/toolkit";

export type TPoint = { x: number; y: number };

export type TWaiter = {
  x: number;
  y: number;
  table: {
    id: string | null;
    x: number;
    y: number;
  };
  served: string[];
  target: string | null;
};

const initialState: TWaiter = {
  x: 700,
  y: 700,
  table: { id: null, x: 0, y: 0 },
  served: [],
  target: null,
};

const waiterSlice = createSlice({
  name: "waiterSlice",
  initialState,
  reducers: {
    moveWaiter(state) {
      const table = state.table;

      if (!table.id) {
        return;
      }

      if (
        Math.abs(table.x - state.x) > 10 ||
        Math.abs(table.y - state.y) > 10
      ) {
        state.x += (table.x - state.x) / 40;
        state.y += (table.y - state.y) / 40;
      } else {
        if (state.target) {
          state.served.push(state.target);
        }

        state.target = null;
      }
    },
    assignWaiter(state, action) {
      const { table, clientId } = action.payload;

      const { x, y, id } = table;

      state.table = { x, y, id };
      state.target = clientId;
    },
  },
});

export const { moveWaiter, assignWaiter } = waiterSlice.actions;

export const getWaiter = (state: any) => state.waiter;

export default waiterSlice.reducer;

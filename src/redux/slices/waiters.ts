import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type TPoint = { x: number; y: number };

export type TWaiter = {
  x: number;
  y: number;
  isServing: boolean;
  table: {
    id: string | null;
    x: number;
    y: number;
  };
};

export type TState = {
  waiters: Record<string, TWaiter>;
};

const initialState: TState = {
  waiters: {},
};

const waitersSlice = createSlice({
  name: "waitersSlice",
  initialState,
  reducers: {
    spawnWaiter(state) {
      const id = uuidv4();
      state.waiters[id] = {
        x: 700,
        y: 700,
        isServing: false,
        table: { id: null, x: 0, y: 0 },
      };
    },
    moveWaiters(state) {
      Object.keys(state.waiters).forEach((id: string) => {
        const table = state.waiters[id].table;

        if (!table.id) {
          return;
        }

        if (
          Math.abs(table.x - state.waiters[id].x) > 10 ||
          Math.abs(table.y - state.waiters[id].y) > 10
        ) {
          state.waiters[id].x += (table.x - state.waiters[id].x) / 40;
          state.waiters[id].y += (table.y - state.waiters[id].y) / 40;
        } else {
          state.waiters[id].isServing = true;
          // процесс обслуживания
        }
      });
    },
    assignWaiter(state, action) {
      console.log("SSSSSS", action.payload);
      const { freeWaiter, table } = action.payload;

      const { x, y, id } = table;

      state.waiters[freeWaiter.id].table = { x, y, id };
    },
  },
});

export const { spawnWaiter, moveWaiters, assignWaiter } = waitersSlice.actions;

export const getWaiters = (state: any) => state.waiters;

export default waitersSlice.reducer;

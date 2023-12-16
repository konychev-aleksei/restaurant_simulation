import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type TTable = {
  x: number;
  y: number;
  clientId: string | null;
};

export type TState = {
  tables: Record<string, TTable>;
};

const initialState: TState = {
  tables: {},
};

const tableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    clearTables() {
      return initialState;
    },
    generateTables(state, action) {
      const { count, tableSize } = action.payload;

      const tables: TState["tables"] = {};

      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; ++j) {
          const tableExists = Math.random() > 0.7;

          if (tableExists) {
            const id = uuidv4();
            const x = tableSize * (j * 2 + 1) * 10;
            const y = tableSize * (i * 2 + 1) * 10;

            tables[id] = {
              x,
              y,
              clientId: null,
            };
          }
        }

        state.tables = tables;
      }
    },
    assignTable(state, action) {
      const { freeClient, freeTable } = action.payload;

      state.tables[freeTable.id].clientId = freeClient.id;
    },
  },
});

export const { generateTables, assignTable, clearTables } = tableSlice.actions;

export const getTables = (state: any) => state.tables;

export default tableSlice.reducer;

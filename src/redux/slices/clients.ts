import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type TPoint = { x: number; y: number };

export type TClient = {
  x: number;
  y: number;
  isSet: boolean;
  isLeaving: boolean;
  table: {
    id: string | null;
    x: number;
    y: number;
  };
};

export type TState = {
  clients: Record<string, TClient>;
};

const initialState: TState = {
  clients: {},
};

const clientsSlice = createSlice({
  name: "clientsSlice",
  initialState,
  reducers: {
    spawnClient(state) {
      const id = uuidv4();
      state.clients[id] = {
        x: 0,
        y: 0,
        isSet: false,
        isLeaving: false,
        table: { id: null, x: 0, y: 0 },
      };
    },
    moveClientsToTable(state) {
      Object.keys(state.clients).forEach((id: string) => {
        const table = state.clients[id].table;

        if (
          table.id &&
          (Math.abs(table.x - state.clients[id].x) > 10 ||
            Math.abs(table.y - state.clients[id].y) > 10)
        ) {
          state.clients[id].x += table.x / 40;
          state.clients[id].y += table.y / 40;
        } else {
          state.clients[id].isSet = true;
        }
      });
    },
    moveClientsToExit(state) {
      const trash: string[] = [];

      Object.keys(state.clients).forEach((id: string) => {
        const table = state.clients[id].table;
        const isLeaving = state.clients[id].isLeaving;

        if (table.id && isLeaving) {
          if (state.clients[id].x > 20 || state.clients[id].y > 20) {
            state.clients[id].x -= table.x / 20;
            state.clients[id].y -= table.y / 20;

            return;
          }

          trash.push(id);
        }
      });

      trash.forEach((id) => {
        delete state.clients[id];
      });
    },
    assignClient(state, action) {
      const { freeClient, freeTable } = action.payload;

      const { x, y, id } = freeTable;

      state.clients[freeClient.id].table = { x, y, id };
    },
    clientLeave(state) {
      const ids = Object.keys(state.clients);
      const id = ids[0];

      state.clients[id].isLeaving = true;
    },
  },
});

export const {
  spawnClient,
  moveClientsToTable,
  moveClientsToExit,
  assignClient,
  clientLeave,
} = clientsSlice.actions;

export const getClients = (state: any) => state.clients;

export default clientsSlice.reducer;

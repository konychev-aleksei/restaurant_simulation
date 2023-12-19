import { createSlice } from "@reduxjs/toolkit";

export type TConfig = {
  spawnRate: number;
  waiterSpeed: number;
  leaveRate1: number;
  leaveRate2: number;
  clientSpeed: number;
  serviceSpeed: number;
  foodQuality: number;
  isSimulating: boolean;
  time: string[];
  params: {
    leaveRate1: number[];
    leaveRate2: number[];
    spawnRate: number[];
    foodQuality: number[];
    waiterSpeed: number[];
    overallHappiness: number[];
  };
};

const initialState: TConfig = {
  isSimulating: false,
  spawnRate: 5000,
  waiterSpeed: 500,
  leaveRate1: 0,
  leaveRate2: 0,
  clientSpeed: 0,
  serviceSpeed: 1000,
  foodQuality: 1000,
  time: [],
  params: {
    leaveRate1: [],
    leaveRate2: [],
    spawnRate: [],
    foodQuality: [],
    waiterSpeed: [],
    overallHappiness: [],
  },
};

const configSlice = createSlice({
  name: "configSlice",
  initialState,
  reducers: {
    setSpawnRate(state, action) {
      state.spawnRate = (1 / action.payload) * 5000;
    },
    setWaiterSpeed(state, action) {
      state.waiterSpeed = (1 / action.payload) * 5000;
    },
    setLeaveRate1(state, action) {
      state.leaveRate1 = action.payload * 500;
    },
    setLeaveRate2(state, action) {
      state.leaveRate2 = action.payload * 500;
    },
    setClientSpeed(state, action) {
      state.clientSpeed = action.payload / 10;
    },
    setFoodQuality(state, action) {
      state.foodQuality = (1 / action.payload) * 5000;
    },
    setToggleSimulation(state) {
      state.isSimulating = !state.isSimulating;
    },
    setParams(state) {
      const time = new Date(Date.now());

      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      state.time.push(`${minutes}:${seconds}`);

      state.params.spawnRate.push(
        Number(((1 / state.spawnRate) * 500).toFixed(2))
      );
      state.params.foodQuality.push(
        Number(((1 / state.foodQuality) * 500).toFixed(2))
      );
      state.params.waiterSpeed.push(
        Number(((1 / state.waiterSpeed) * 500).toFixed(2))
      );

      state.params.leaveRate1.push(
        Number((state.leaveRate1 / 5000).toFixed(2))
      );
      state.params.leaveRate2.push(
        Number((state.leaveRate2 / 5000).toFixed(2))
      );

      const happiness =
        (-state.waiterSpeed / 3 +
          state.spawnRate / 2 -
          state.foodQuality * 2 +
          state.leaveRate1 * 0.5 +
          state.leaveRate2 * 0.5 +
          Math.random() * 20) /
        1500;

      state.params.overallHappiness.push(happiness);
    },
  },
});

export const {
  setSpawnRate,
  setWaiterSpeed,
  setLeaveRate1,
  setLeaveRate2,
  setClientSpeed,
  setFoodQuality,
  setToggleSimulation,
  setParams,
} = configSlice.actions;

export const getConfig = (state: any) => state.config;

export default configSlice.reducer;

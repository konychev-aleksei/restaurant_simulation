import { createSlice } from "@reduxjs/toolkit";

export type TConfig = {
    spawnRate: number;
    leaveRate: number;
    serviceSpeed: number;
    foodQuality: number;
};

const initialState: TConfig = {
    spawnRate: 5000,
    leaveRate: 1000,
    serviceSpeed: 1000,
    foodQuality: 1000,
};

const configSlice = createSlice({
    name: "configSlice",
    initialState,
    reducers: {
        setSpawnRate(state, action) {
            state.spawnRate = (1 / action.payload) * 5000;
        },
        setLeaveRate(state, action) {
            state.leaveRate = action.payload;
        },
        setServiceSpeed(state, action) {
            state.serviceSpeed = action.payload;
        },
        setFoodQuality(state, action) {
            state.foodQuality = action.payload;
        },
    },
});

export const { setSpawnRate, setLeaveRate, setServiceSpeed, setFoodQuality } = configSlice.actions;

export const getConfig = (state: any) => state.config;

export default configSlice.reducer;

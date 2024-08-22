import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';


export type AppStateModel = {};

export const appDataInitialState: AppStateModel = {};

const slice = createSlice({
    name: 'appState',
    initialState: appDataInitialState,
    reducers: {},
});

// Actions
export const appDataActions = {
    ...slice.actions,
};

// Selectors
const selectAppDataState = (state: RootState) => state.appState;


export const appStateReducer = slice.reducer;

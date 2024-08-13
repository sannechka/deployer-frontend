import { RootState } from '@app/store/types';
import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';


export type AppStateModel = {
    deployments: string[];

};

export const appDataInitialState: AppStateModel = {
    deployments: []
};

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

export const selectDeployments = () =>
    createDraftSafeSelector(selectAppDataState, state => {
        return state.selectDeployments || [];
    });

export const appStateReducer = slice.reducer;

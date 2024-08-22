import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi } from './base-query';
import { appStateReducer } from './slices/app-state.slice';

const logger = createLogger({
    collapsed: true,

    predicate: (_: any, action: any) => !action.type.startsWith('api/subscriptions'),
});

export const reducers = persistReducer(
    {
        key: 'deployer',
        version: 1,
        storage,
        // Data from that slice will be stored in localStorage
        whitelist: ['appState'],
    },
    combineReducers({
        appState: appStateReducer,
        // reducer for RTQ
        [baseApi.reducerPath]: baseApi.reducer,
    }),
);

const reduxDevtools =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
            },
        }).concat([logger, baseApi.middleware]),
    enhancers: [reduxDevtools].filter(it => it),
});

export const Persistor = persistStore(store);

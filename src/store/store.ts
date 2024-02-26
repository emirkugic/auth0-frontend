import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from "redux-persist";

import PersistReducers from "./persistConfig";

const store = configureStore({
    reducer: {
        auth: PersistReducers.persistedAuthReducer,
        user: PersistReducers.persistedUserReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
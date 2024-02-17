import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from "redux-persist";

import { persistedAuthReducer } from "./persistConfig";

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
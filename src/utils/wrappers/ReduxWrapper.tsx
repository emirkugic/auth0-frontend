import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@mui/material";
import { Provider } from 'react-redux';
import { FC } from 'react';

import { persistor, store } from "../../store";
import { ReduxWrapperProps } from "../../types";

const ReduxWrapper: FC<ReduxWrapperProps> = ({ children }) => (
    <Provider store={store}>
        <PersistGate loading={<CircularProgress />} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
);

export default ReduxWrapper;
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slice/authSlice';

const encryptor = encryptTransform({
    secretKey: import.meta.env.VITE_SECRET_REDUX_KEY,
});

const authPersistConfig: PersistConfig<any> = {
    key: 'auth',
    version: 1,
    storage,
    transforms: [encryptor],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export { persistedAuthReducer };
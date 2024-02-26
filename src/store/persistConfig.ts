import { encryptTransform } from 'redux-persist-transform-encrypt';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice'

const encryptor = encryptTransform({
    secretKey: import.meta.env.VITE_SECRET_REDUX_KEY,
});

const authPersistConfig: PersistConfig<any> = {
    key: 'auth',
    version: 1,
    storage,
    transforms: [encryptor],
};

const userPersistConfig: PersistConfig<any> = {
    key: 'user',
    version: 1,
    storage,
    transforms: [encryptor],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);


export default { persistedAuthReducer, persistedUserReducer };
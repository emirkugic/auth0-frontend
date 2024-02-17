import { ThunkDispatch } from 'redux-thunk';
import { Action } from "redux";

import { User, AppThunk, RootState } from "../../types";
import { AuthService } from "../../services";

const setAuthData = (
    loginData: User | undefined,
): AppThunk => {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        try {
            await AuthService.setAuthData(loginData, dispatch);
        } catch (error) {
            console.error('Authentication Error:', error);
            throw error;
        }
    };
};

const register = (registerData: User): AppThunk => {
    return async () => {
        await AuthService.register(registerData);
    };
};

export default { setAuthData, register };
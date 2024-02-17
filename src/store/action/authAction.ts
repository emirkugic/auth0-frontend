import { ThunkDispatch } from 'redux-thunk';
import { Action } from "redux";

import { User, AppThunk, RootState } from "../../types";
import { AuthService } from "../../services";

const login = (
    loginData: User | undefined,
): AppThunk => {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await AuthService.login(loginData, dispatch);
    };
};

const register = (registerData: User): AppThunk => {
    return async () => {
        await AuthService.register(registerData);
    };
};

const logout = (): AppThunk => {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await AuthService.logout(dispatch);
    };
};

export default { login, register, logout };
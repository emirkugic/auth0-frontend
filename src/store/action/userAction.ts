import { ThunkDispatch } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

import { setError, setLoading, setUser } from '../slice/userSlice';
import { AppThunk, RootState } from '../../types';
import { UserService } from '../../services';

const fetchUserData = (): AppThunk => {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        try {
            await dispatch(setLoading(true));

            const userData = await UserService.fetchUserData();

            await dispatch(setUser(userData));
            await dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));

            dispatch(setError('Failed to fetch user data'));
        }
    };
};

export default { fetchUserData };

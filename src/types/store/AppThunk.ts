import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import RootState from "./RootState";

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action
>;

export default AppThunk;
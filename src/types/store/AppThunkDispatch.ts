import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

import RootState from "./RootState";

type AppThunkDispatch = ThunkDispatch<RootState, any, Action>;

export default AppThunkDispatch;
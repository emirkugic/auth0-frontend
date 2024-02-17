import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppThunkDispatch } from "../types";

const useAppDispatch = () => useDispatch<AppThunkDispatch>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default { useAppDispatch, useAppSelector };
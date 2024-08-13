
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from "./types";

// Typed hooks.

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

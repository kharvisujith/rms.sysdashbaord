import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { candidateSlice } from "../Redux/candidateSlice";
import { interviewerSlice } from "../Redux/interviewerSlice";
import { subjectExpertSlice } from "../Redux/subjectexpertSlice";

export const store = configureStore({
  reducer: {
    candidate: candidateSlice.reducer,
    interviewer: interviewerSlice.reducer,
    subjectExpert: subjectExpertSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

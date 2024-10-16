import { configureStore } from "@reduxjs/toolkit";
import personalReducer from "../features/candidate/personalSlice";
import userReducer from "../features/user/userSlice";
import referenceReducer from '../features/reference/referenceSlice';

export const store = configureStore({
  reducer: {
    personal: personalReducer,
    user: userReducer,
    reference: referenceReducer
  },
});

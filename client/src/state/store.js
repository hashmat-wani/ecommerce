import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../state";

export const store = configureStore({
  reducer: {
    cartReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./carousel/carouselSlice";
import catalogReducer from "./catalog/catalogSlice";

const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    catalog: catalogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

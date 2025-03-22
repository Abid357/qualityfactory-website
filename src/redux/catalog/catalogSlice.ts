import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catalogScrollPosition: 0
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCatalogScrollPosition: (state, action) => {
      state.catalogScrollPosition = action.payload;
    }
  },
});

export const { setCatalogScrollPosition } = catalogSlice.actions;

export default catalogSlice.reducer;
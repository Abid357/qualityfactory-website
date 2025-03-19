import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: "",
  filterType: "", // "brand" or "category"
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
  },
});

export const { setItems, setFilter, setFilterType } = carouselSlice.actions;

export default carouselSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: "",
  filterType: "", // "brand" or "category"
  viewType: "", // "grid" or "carousel"
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
    setViewType: (state, action) => {
      state.viewType = action.payload;
    },
  },
});

export const { setItems, setFilter, setFilterType, setViewType } = carouselSlice.actions;

export default carouselSlice.reducer;

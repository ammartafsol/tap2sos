import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  serviceProviderPortfolioProgress: 0
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  //   reducer needs a map
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setPortfolioProgress: (state, action) => {
      state.serviceProviderPortfolioProgress = action.payload;
    },

    clearCommonData: (state) => {
      state.categories = [];
    },
  },
});

export const { setCategories, clearCommonData, setPortfolioProgress } = commonSlice.actions;

export default commonSlice.reducer;

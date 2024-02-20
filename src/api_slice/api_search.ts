import { createSlice, configureStore } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: [],
  },
  reducers: {
    dataSearch: (state, action: any) => {
      state.value = action.payload.data;
    },
  },
});
export const { dataSearch } = searchSlice.actions;

export default searchSlice;

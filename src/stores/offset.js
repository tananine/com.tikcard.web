import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    headerHeight: 0,
    footerHeight: 0,
    addContactListHeight: 0,
  },
  reducers: {
    setHeaderHeight: (state, action) => {
      state.headerHeight = action.payload;
    },
    setFooterHeight: (state, action) => {
      state.footerHeight = action.payload;
    },
    setAddContactListHeight: (state, action) => {
      state.addContactListHeight = action.payload;
    },
  },
});

export const { setHeaderHeight, setFooterHeight, setAddContactListHeight } =
  layoutSlice.actions;

export default layoutSlice.reducer;

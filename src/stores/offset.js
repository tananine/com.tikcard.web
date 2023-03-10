import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    headerHeight: 0,
    footerHeight: 0,
    addContactListHeight: 0,
    isShow: {
      footer: true,
    },
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
    setShowFooter: (state) => {
      state.isShow.footer = true;
    },
    setHideFooter: (state) => {
      state.isShow.footer = false;
    },
  },
});

export const {
  setHeaderHeight,
  setFooterHeight,
  setAddContactListHeight,
  setShowFooter,
  setHideFooter,
} = layoutSlice.actions;

export default layoutSlice.reducer;

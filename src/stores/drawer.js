import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    menuDrawer: false,
    previewDrawer: false,
  },
  reducers: {
    menuToggle: (state) => {
      state.menuDrawer = !state.menuDrawer;
    },
    previewToggle: (state) => {
      state.previewDrawer = !state.previewDrawer;
    },
  },
});

export const { menuToggle, previewToggle } = drawerSlice.actions;

export default drawerSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const controllerSlice = createSlice({
  name: 'controller',
  initialState: {
    darkMode: false,
  },
  reducers: {
    darkModeToggle: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { darkModeToggle } = controllerSlice.actions;

export default controllerSlice.reducer;

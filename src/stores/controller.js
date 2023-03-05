import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const controllerSlice = createSlice({
  name: 'controller',
  initialState: {
    darkMode: false,
    profileInUse: {
      profileState: null,
      profileId: null,
    },
  },
  reducers: {
    darkModeToggle: (state) => {
      state.darkMode = !state.darkMode;
    },
    setProfileInUse: (state, action) => {
      state.profileInUse.profileState = action.payload.profileState;
      state.profileInUse.profileId = action.payload.profileId;
    },
  },
});

export const { darkModeToggle, setProfileInUse } = controllerSlice.actions;

export default controllerSlice.reducer;

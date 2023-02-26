import { createSlice } from '@reduxjs/toolkit';

export const controllerSlice = createSlice({
  name: 'controller',
  initialState: {
    darkMode: false,
    profileInUse: {
      profile: null,
      profileId: null,
    },
  },
  reducers: {
    darkModeToggle: (state) => {
      state.darkMode = !state.darkMode;
    },
    setProfileInUse: (state, action) => {
      state.profileInUse.profile = action.payload.profile;
      state.profileInUse.profileId = action.payload.profileId;
    },
  },
});

export const { darkModeToggle, setProfileInUse } = controllerSlice.actions;

export default controllerSlice.reducer;

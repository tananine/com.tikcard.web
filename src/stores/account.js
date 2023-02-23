import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    activation: {
      primaryProfile: null,
      secondaryProfile: null,
    },
    profiles: [],
  },
  reducers: {
    setActivationProfile: (state, action) => {
      state.activation.primaryProfile = action.payload.primaryProfile;
      state.activation.secondaryProfile = action.payload.secondaryProfile;
    },
    setPrimaryProfile: (state, action) => {
      state.activation.primaryProfile = action.payload;
    },
    setSecondaryProfile: (state, action) => {
      state.activation.secondaryProfile = action.payload;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
  },
});

export const {
  setActivationProfile,
  setPrimaryProfile,
  setSecondaryProfile,
  setProfiles,
} = accountSlice.actions;

export default accountSlice.reducer;

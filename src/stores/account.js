import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    accountData: {
      email: null,
      tutorial: null,
    },
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
    setAccount: (state, action) => {
      state.accountData = action.payload;
    },
    setTutorialSuccess: (state, action) => {
      state.accountData.tutorial[action.payload] = true;
    },
  },
});

export const {
  setActivationProfile,
  setPrimaryProfile,
  setSecondaryProfile,
  setProfiles,
  setAccount,
  setTutorialSuccess,
} = accountSlice.actions;

export default accountSlice.reducer;

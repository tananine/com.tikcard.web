import { createSlice } from '@reduxjs/toolkit';

export const reloadSlice = createSlice({
  name: 'reload',
  initialState: {
    contactList: 0,
    currentProfile: 0,
    layoutsIndex: 0,
  },
  reducers: {
    reloadContactList: (state) => {
      state.contactList += 1;
    },
    reloadCurrentProfile: (state) => {
      state.currentProfile += 1;
    },
    reloadLayoutsIndex: (state) => {
      state.layoutsIndex += 1;
    },
  },
});

export const { reloadContactList, reloadCurrentProfile, reloadLayoutsIndex } =
  reloadSlice.actions;

export default reloadSlice.reducer;

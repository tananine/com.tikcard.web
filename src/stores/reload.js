import { createSlice } from '@reduxjs/toolkit';

export const reloadSlice = createSlice({
  name: 'reload',
  initialState: {
    contactList: true,
  },
  reducers: {
    reloadContactList: (state) => {
      state.contactList += 1;
    },
  },
});

export const { reloadContactList } = reloadSlice.actions;

export default reloadSlice.reducer;

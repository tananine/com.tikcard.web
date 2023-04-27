import { createSlice } from '@reduxjs/toolkit';

export const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    devices: [],
    isScanDouble: false,
  },
  reducers: {
    setDevice: (state, action) => {
      state.devices = action.payload;
    },
    setIsScanDouble: (state, action) => {
      state.isScanDouble = action.payload;
    },
  },
});

export const { setDevice, setIsScanDouble } = deviceSlice.actions;

export default deviceSlice.reducer;

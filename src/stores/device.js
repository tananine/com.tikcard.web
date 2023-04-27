import { createSlice } from '@reduxjs/toolkit';

export const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    device: [],
    isScanDouble: false,
  },
  reducers: {
    setDevice: (state, action) => {
      state.device = action.payload;
    },
    setIsScanDouble: (state, action) => {
      state.isScanDouble = action.payload;
    },
  },
});

export const { setDevice, setIsScanDouble } = deviceSlice.actions;

export default deviceSlice.reducer;

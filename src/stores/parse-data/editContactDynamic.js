import { createSlice } from '@reduxjs/toolkit';

export const editContactDynamicSlice = createSlice({
  name: 'editContactDynamic',
  initialState: {
    isChild: false,
  },
  reducers: {
    setEditContactDynamicData: (state, action) => {
      state.isChild = action.payload.isChild;
    },
  },
});

export const { setEditContactDynamicData } = editContactDynamicSlice.actions;

export default editContactDynamicSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const editContactDynamicSlice = createSlice({
  name: 'editContactDynamic',
  initialState: {
    isChild: false,
    data: {
      isEdit: false,
      contactItemId: null,
      name: null,
    },
  },
  reducers: {
    setEditContactDynamicChild: (state, action) => {
      state.isChild = action.payload.isChild;
    },
    setEditContactDynamicData: (state, action) => {
      state.data.contactItemId = action.payload.contactItemId;
      state.data.name = action.payload.name;
    },
  },
});

export const { setEditContactDynamicChild, setEditContactDynamicData } =
  editContactDynamicSlice.actions;

export default editContactDynamicSlice.reducer;

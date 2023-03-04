import { createSlice } from '@reduxjs/toolkit';

export const editContactDynamicSlice = createSlice({
  name: 'editContactDynamic',
  initialState: {
    isChild: false,
    data: {
      contactId: null,
      contactItemId: null,
      name: null,
      contact: null,
    },
  },
  reducers: {
    setEditContactDynamicChild: (state, action) => {
      state.isChild = action.payload.isChild;
    },
    setEditContactDynamicData: (state, action) => {
      state.data.contactId = action.payload.contactId || null;
      state.data.contactItemId = action.payload.contactItemId || null;
      state.data.name = action.payload.name || null;
      state.data.contact = action.payload.contact || null;
    },
  },
});

export const { setEditContactDynamicChild, setEditContactDynamicData } =
  editContactDynamicSlice.actions;

export default editContactDynamicSlice.reducer;

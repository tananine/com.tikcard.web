import { createSlice } from '@reduxjs/toolkit';

export const editContactDynamicSlice = createSlice({
  name: 'editContactDynamic',
  initialState: {
    isChild: false,
    data: {
      contactId: null,
      contactItemId: null,
      name: null,
      imageIcon: null,
      data: null,
      uri: {
        defaultUri: null,
        androidUri: null,
        iosUri: null,
      },
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
      state.data.imageIcon = action.payload.imageIcon || null;

      state.data.data = action.payload.data || null;
      state.data.uri.defaultUri = action.payload.uri.defaultUri || null;
      state.data.uri.androidUri = action.payload.uri.androidUri || null;
      state.data.uri.iosUri = action.payload.uri.iosUri || null;
    },
  },
});

export const { setEditContactDynamicChild, setEditContactDynamicData } =
  editContactDynamicSlice.actions;

export default editContactDynamicSlice.reducer;

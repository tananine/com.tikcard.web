import { createSlice } from '@reduxjs/toolkit';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    switchProfilePopup: false,
    addContactPopup: false,
    editCardPopup: false,
    editContactDynamicPopup: false,
    addProfilePopup: false,
  },
  reducers: {
    switchProfileToggle: (state) => {
      state.switchProfilePopup = !state.switchProfilePopup;
    },
    addContactToggle: (state) => {
      state.addContactPopup = !state.addContactPopup;
    },
    editCardToggle: (state) => {
      state.editCardPopup = !state.editCardPopup;
    },
    editContactDynamicToggle: (state) => {
      state.editContactDynamicPopup = !state.editContactDynamicPopup;
    },
    addProfileToggle: (state) => {
      state.addProfilePopup = !state.addProfilePopup;
    },
  },
});

export const {
  switchProfileToggle,
  addContactToggle,
  editCardToggle,
  previewToggle,
  editContactDynamicToggle,
  addProfileToggle,
} = popupSlice.actions;

export default popupSlice.reducer;

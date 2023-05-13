import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const controllerSlice = createSlice({
  name: 'controller',
  initialState: {
    darkMode: false,
    fetchQueue: 0,
    tutorialQue: [],
    profileInUse: {
      profileState: null,
      profileId: null,
    },
  },
  reducers: {
    darkModeToggle: (state) => {
      state.darkMode = !state.darkMode;
    },
    setProfileInUse: (state, action) => {
      state.profileInUse.profileState = action.payload.profileState;
      state.profileInUse.profileId = action.payload.profileId;
      axios.defaults.headers.common['profile'] = state.profileInUse.profileId;
    },
    startFetchQueue: (state) => {
      state.fetchQueue += 1;
    },
    endFetchQueue: (state) => {
      state.fetchQueue -= 1;
    },
    pushTutorialQue: (state, action) => {
      if (!state.tutorialQue.includes(action.payload)) {
        state.tutorialQue.push(action.payload);
      }
    },
    removeTutorialQue: (state, action) => {
      const index = state.tutorialQue.indexOf(action.payload);
      state.tutorialQue.splice(index, 1);
    },
  },
});

export const {
  darkModeToggle,
  setProfileInUse,
  startFetchQueue,
  endFetchQueue,
  pushTutorialQue,
  removeTutorialQue,
} = controllerSlice.actions;

export default controllerSlice.reducer;

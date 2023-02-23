import { configureStore } from '@reduxjs/toolkit';

import accountReducer from 'stores/account';
import popupReducer from 'stores/popup';
import controllerReducer from 'stores/controller';
import layoutReducer from 'stores/offset';
import drawerReducer from 'stores/drawer';

import editContactDynamicReducer from 'stores/parse-data/editContactDynamic';

export default configureStore({
  reducer: {
    account: accountReducer,
    popup: popupReducer,
    controller: controllerReducer,
    layout: layoutReducer,
    drawer: drawerReducer,

    // ParseData
    editContactDynamic: editContactDynamicReducer,
  },
});

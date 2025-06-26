// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import orderReducer from "./orderSlice.js";
import requestReducer from "./requestSlice.js";
import memberReducer from "./membersSlice.js";
import amcOrderReducer from "./amcOrderSlice.js";
import memberHistoryReducer from "./memberHistorySlice.js";
import productReducer from "./productSlice.js";
import pendingproductReducer from "./pendingproductSlice.js";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
   whitelist: ["auth"], 
};

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  request: requestReducer,
  members: memberReducer,
  amcOrder: amcOrderReducer,
  memberHistory: memberHistoryReducer,
  product: productReducer,
  pendingProduct: pendingproductReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

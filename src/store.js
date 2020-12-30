import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reducer as network } from "react-native-offline";
import { createNetworkMiddleware } from "react-native-offline";
import * as reducers from "./reducers";

const rootReducer = combineReducers({
  ...reducers,
  network,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const networkMiddleware = createNetworkMiddleware();

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk, networkMiddleware))
  // applyMiddleware(thunk, networkMiddleware)
);

export const persistor = persistStore(store);

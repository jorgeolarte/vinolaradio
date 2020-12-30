import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer as network } from "react-native-offline";
import { createNetworkMiddleware } from "react-native-offline";
import * as reducers from "./reducers";

const rootReducer = combineReducers({
  ...reducers,
  network,
});

const networkMiddleware = createNetworkMiddleware();

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk, networkMiddleware))
);

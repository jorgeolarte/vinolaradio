import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import RootStackNavigator from "./src/index";

const App = () => {
  return (
    <Provider store={store}>
      <RootStackNavigator />
    </Provider>
  );
};
export default App;

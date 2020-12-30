import React from "react";
import { Provider } from "react-redux";
import { ReduxNetworkProvider } from "react-native-offline";
import { store } from "./src/store";
import MyApp from "./src/index";

export default function () {
  return (
    <Provider store={store}>
      <ReduxNetworkProvider
        pingTimeout={1000}
        pingServerUrl='https://google.com'
        pingInterval={30000}
        httpMethod='HEAD'
        pingInBackground={true}
        pingOnlyIfOffline={true}
      >
        <MyApp />
      </ReduxNetworkProvider>
    </Provider>
  );
}

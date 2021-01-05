import React from "react";
import { Provider } from "react-redux";
import { ReduxNetworkProvider } from "react-native-offline";
import { store } from "./src/store";
import MyApp from "./src/index";
import * as Sentry from "sentry-expo";
import { SENTRY_DNS } from "@env";

Sentry.init({
  dsn: SENTRY_DNS,
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  tracesSampleRate: 0.5,
});

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

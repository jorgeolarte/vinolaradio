import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableHighlight,
} from "react-native";
import {
  offlineActionCreators,
  checkInternetConnection,
} from "react-native-offline";

const { connectionChange } = offlineActionCreators;

const OfflineScreen = ({ connectionChange }) => {
  useEffect(() => {
    return checkConnection;
  }, []);

  const checkConnection = async () => {
    const connection = await checkInternetConnection(
      "https://google.com",
      1000,
      true,
      "HEAD"
    );
    console.log("OfflineScreen 1: ", connection);
    connectionChange(connection);
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/bgOffline.png")}
    >
      <View stlye={styles.header}>
        <Image
          style={styles.image}
          source={require("../../assets/offline.png")}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>¡Oooops!</Text>
        <Text style={styles.text}>Métale candela al internet</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => checkConnection()}
        >
          <Text style={styles.textButton}>Revisar conexión</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  return { network: state.network };
};

const mapDispatchToProps = (dispatch) => ({
  connectionChange: (isConnected) => dispatch(connectionChange(isConnected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OfflineScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff0000",
  },
  header: {
    // flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  content: {
    // flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 44,
    fontWeight: "bold",
    // paddingBottom: 5,
    color: "#1C2833",
  },
  text: {
    fontSize: 18,
    paddingBottom: 10,
    color: "#1C2833",
  },
  button: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

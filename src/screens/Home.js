import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import CoverArt from "../components/CoverArt";
import Song from "../components/Song";
import Player from "../components/Player";
import Volume from "../components/Volume";
import * as Analytics from "expo-firebase-analytics";

const HomeScreen = ({ user }) => {
  useEffect(() => {
    Analytics.setUserId(user.userUid);
  }, []);

  return (
    <View style={styles.container}>
      <CoverArt />
      <Song />
      <Volume />
      <Player />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#343a40",
    flexWrap: "nowrap",
  },
});

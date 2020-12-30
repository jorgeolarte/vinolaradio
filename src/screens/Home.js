import React from "react";
import { View, StyleSheet } from "react-native";
import CoverArt from "../components/CoverArt";
import Song from "../components/Song";
import Player from "../components/Player";
import Volume from "../components/Volume";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CoverArt />
      <Song />
      <Volume />
      <Player />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#343a40",
    flexWrap: "nowrap",
  },
});

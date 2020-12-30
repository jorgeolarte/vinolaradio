import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default ({ coverArt }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.coverArt} source={{ uri: `${coverArt}` }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#343a40",
    // backgroundColor: "red",
  },
  coverArt: {
    width: 300,
    height: 300,
  },
});

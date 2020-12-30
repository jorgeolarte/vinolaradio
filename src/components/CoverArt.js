import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image } from "react-native";

const CoverArt = ({ song }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.coverArt} source={{ uri: `${song.coverArt}` }} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    song: state.song,
  };
};

export default connect(mapStateToProps)(CoverArt);

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

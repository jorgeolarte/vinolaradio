import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import TextTicker from "react-native-text-ticker";

const Song = ({ song }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.listening}>Estás escuchando</Text>
      <TextTicker
        style={styles.artist}
        loop
        scrollSpeed={300}
        marqueeDelay={1000}
      >
        {song.artist === "" ? "Vinola Radio" : song.artist}
      </TextTicker>
      {/* <Text numberOfLines={1} style={styles.artist}>
        {artist === "" ? "Vinola Radio" : artist}
      </Text> */}
      {!(song.track === "" || song.track === "undefined") ? (
        <TextTicker
          style={styles.track}
          loop
          scrollSpeed={300}
          marqueeDelay={1000}
        >
          {song.track}
        </TextTicker>
      ) : null}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    song: state.song,
  };
};

export default connect(mapStateToProps)(Song);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "#343a40",
    // backgroundColor: "blue",
    paddingHorizontal: 20,
  },
  listening: {
    fontSize: 14,
    color: "#999",
  },
  artist: {
    color: "#eee",
    textAlign: "center",
    fontSize: 24,
  },
  track: {
    color: "#eee",
    textAlign: "center",
    fontSize: 28,
  },
});

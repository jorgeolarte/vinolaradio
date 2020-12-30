import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TextTicker from "react-native-text-ticker";

export default ({ artist, track }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.listening}>Estás escuchando</Text>
      <TextTicker
        style={styles.artist}
        loop
        scrollSpeed={300}
        marqueeDelay={1000}
      >
        {artist === "" ? "Vinola Radio" : artist}
      </TextTicker>
      {/* <Text numberOfLines={1} style={styles.artist}>
        {artist === "" ? "Vinola Radio" : artist}
      </Text> */}
      {!(track === "" || track === "undefined") ? (
        <TextTicker
          style={styles.track}
          loop
          scrollSpeed={300}
          marqueeDelay={1000}
        >
          {track}
        </TextTicker>
      ) : null}
      <StatusBar style="inverted" />
    </View>
  );
};

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

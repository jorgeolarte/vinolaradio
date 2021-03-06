import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

export default ({ sound, isMuted, mute }) => {
  const [volume, setVolume] = useState(1.0);

  const changeVolume = async (volume) => {
    setVolume(volume);
    try {
      await sound.setVolumeAsync(volume);
    } catch (error) {}
  };

  const muteOrPlay = async () => {
    try {
      mute();
      await sound.setIsMutedAsync(!isMuted);
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={muteOrPlay}
        style={styles.volume}
        name={
          isMuted
            ? "ios-volume-mute"
            : volume > 0.85
            ? "ios-volume-high"
            : volume === 0
            ? "ios-volume-mute"
            : "ios-volume-low"
        }
        size={35}
      />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#eee"
        maximumTrackTintColor="#000"
        value={1}
        onValueChange={(x) => changeVolume(x)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#343a40",
    // backgroundColor: "red",
    // flexWrap: "nowrap",
  },
  text: {
    color: "#eee",
  },
  slider: {
    width: 275,
    height: 60,
  },
  volume: {
    color: "#fff",
  },
});

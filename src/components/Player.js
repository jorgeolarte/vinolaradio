import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";

export default ({
  statusPlaying,
  dispatchPlayer,
  sound,
  isMuted,
  loadSong,
}) => {
  const playRecording = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    sound.setOnPlaybackStatusUpdate(updateScreenForSoundStatus);
    await sound.loadAsync(
      {
        uri: "https://radio.netyco.com:17268/;stream.mp3",
      },
      {
        progressUpdateIntervalMillis: 15000,
        shouldPlay: true,
        isMuted: isMuted,
        isLooping: false,
        volume: 1.0,
      },
      (x) => {
        updateScreenForSoundStatus(x);
      }
    );
    // await sound.setVolumeAsync(1);
  };

  const updateScreenForSoundStatus = async (status) => {
    if (status.isPlaying && statusPlaying !== "playing") {
      loadSong();
      await dispatchPlayer("playing");
    } else if (!status.isPlaying && statusPlaying === "playing") {
      await dispatchPlayer("donepause");
    }
  };

  const pauseAndPlayRecording = async () => {
    if (sound != null) {
      if (statusPlaying == "playing") {
        await sound.pauseAsync();
        await sound.unloadAsync();
        dispatchPlayer("donepause");
      } else {
        await sound.playAsync();
        dispatchPlayer("playing");
      }
    }
  };

  const playAndPause = () => {
    if (statusPlaying === "nosound" || statusPlaying === "donepause") {
      dispatchPlayer("isBuffering");
      playRecording();
    } else if (statusPlaying === "playing") {
      pauseAndPlayRecording();
    }
  };

  return (
    <View style={styles.container}>
      {statusPlaying === "isBuffering" ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <TouchableOpacity onPress={playAndPause}>
          <Ionicons
            name={statusPlaying === "playing" ? "ios-pause" : "ios-play"}
            size={70}
            style={styles.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: "center",
    // alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "#343a40",
    // backgroundColor: "red",
  },
  text: {
    color: "#eee",
  },
});

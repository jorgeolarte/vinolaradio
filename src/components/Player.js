import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { dispatchPlayer } from "../reducers/player";
import { loadSong } from "../reducers/song";

const Player = ({ player, dispatchPlayer, loadSong }) => {
  const audio = useRef(new Audio.Sound());

  const playRecording = async () => {
    // await audio.current.setAudioModeAsync({
    //   playsInSilentModeIOS: true,
    //   allowsRecordingIOS: false,
    //   staysActiveInBackground: true,
    //   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //   shouldDuckAndroid: false,
    //   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    //   playThroughEarpieceAndroid: false,
    // });

    audio.current.setOnPlaybackStatusUpdate(updateScreenForSoundStatus);
    await audio.current.loadAsync(
      {
        uri: "https://radio.netyco.com:17268/;stream.mp3",
      },
      {
        progressUpdateIntervalMillis: 15000,
        shouldPlay: true,
        isMuted: player.isMuted,
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
    if (status.isPlaying && player.statusPlaying !== "playing") {
      loadSong();
      await dispatchPlayer("playing");
    } else if (!status.isPlaying && player.statusPlaying === "playing") {
      await dispatchPlayer("donepause");
    }
  };

  const pauseAndPlayRecording = async () => {
    if (audio.current != null) {
      if (player.statusPlaying == "playing") {
        await audio.current.pauseAsync();
        await audio.current.unloadAsync();
        dispatchPlayer("donepause");
      } else {
        await audio.current.playAsync();
        dispatchPlayer("playing");
      }
    }
  };

  const playAndPause = async () => {
    console.log(" player.statusPlaying: ", player.statusPlaying);
    if (
      player.statusPlaying === "nosound" ||
      player.statusPlaying === "donepause"
    ) {
      dispatchPlayer("isBuffering");
      await playRecording();
    } else if (player.statusPlaying === "playing") {
      await pauseAndPlayRecording();
    }
  };

  return (
    <View style={styles.container}>
      {player.statusPlaying === "isBuffering" ? (
        <ActivityIndicator size='large' color='#fff' />
      ) : (
        <TouchableOpacity onPress={() => playAndPause()}>
          <Ionicons
            name={player.statusPlaying === "playing" ? "ios-pause" : "ios-play"}
            size={70}
            style={styles.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadSong: () => dispatch(loadSong()),
  dispatchPlayer: (status) => dispatch(dispatchPlayer(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);

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

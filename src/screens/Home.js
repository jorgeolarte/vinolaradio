import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { loadSong } from "../redux/reducers/song";
import { loadStream } from "../redux/reducers/streaming";
import { dispatchPlayer } from "../redux/reducers/player";
import { mute } from "../redux/reducers/player";
import CoverArt from "../components/CoverArt";
import Song from "../components/Song";
import Player from "../components/Player";
import Volume from "../components/Volume";

const Home = ({
  streamStatus,
  statusPlaying,
  isMuted,
  song,
  sound,
  loadSong,
  loadStream,
  dispatchPlayer,
  mute,
}) => {

  return (
    <View style={styles.container}>
      <CoverArt coverArt={song.coverArt} />
      <Song artist={song.artist} track={song.track} />
      <Volume sound={sound} isMuted={isMuted} mute={mute} />
      <Player
        statusPlaying={statusPlaying}
        dispatchPlayer={dispatchPlayer}
        loadSong={loadSong}
        sound={sound}
        isMuted={isMuted}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    sound: state.player.sound,
    streamStatus: state.streaming.streamStatus,
    song: state.song,
    statusPlaying: state.player.statusPlaying,
    isMuted: state.player.isMuted,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadSong: () => dispatch(loadSong()),
  loadStream: () => dispatch(loadStream()),
  mute: () => dispatch(mute()),
  dispatchPlayer: (status) => dispatch(dispatchPlayer(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#343a40",
    flexWrap: "nowrap",
  },
});

import React from "react";
import { connect } from "react-redux";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Linking, Alert, Share } from "react-native";

const Options = ({ props, song }) => {
  const shared = async () => {
    try {
      const message =
        song.artist === ""
          ? "Estoy escuchando Vinola Radio, sintonízate 🤘 https://bit.ly/32wllYe"
          : `Estoy escuchando ${song.artist} - ${song.track} en Vinola Radio 🤘 https://bit.ly/32wllYe`;
      const result = await Share.share({
        title: "Estoy escuchando Vinola Radio",
        url: "https://bit.ly/32wllYe",
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const thanku = () => {
    Alert.alert("Gracias", "Desarrolla con ❤️ ProbetaLab");
  };

  const rating = async () => {
    const url = "https://bit.ly/32wllYe";
    const supported = await Linking.canOpenURL(
      "market://details?id=com.jorgeolarte.vinolaradio"
    );
    if (supported) {
      await Linking.openURL("market://details?id=com.jorgeolarte.vinolaradio");
    } else {
      await Linking.openURL(url);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={styles.item}
        icon={() => <Ionicons style={styles.item} name="ios-share" />}
        label="Comparte"
        onPress={shared}
      />
      <DrawerItem
        labelStyle={styles.item}
        icon={() => <Ionicons style={styles.item} name="ios-star" />}
        label="Califica"
        onPress={rating}
      />
      <DrawerItem
        labelStyle={styles.item}
        icon={() => <Ionicons style={styles.item} name="ios-heart" />}
        label="Gracias"
        onPress={thanku}
      />
    </DrawerContentScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    song: state.song,
  };
};

export default connect(mapStateToProps)(Options);

// export default Options;

const styles = StyleSheet.create({
  item: {
    color: "white",
    fontSize: 24,
  },
});

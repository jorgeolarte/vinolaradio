import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";

const ButtonMenu = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.toggleDrawer()}
    >
      <Ionicons style={styles.shareIcon} name="ios-more" />
    </TouchableOpacity>
  );
};

export default ButtonMenu;

const styles = StyleSheet.create({
  button: {
    color: "#fff",
  },
  shareIcon: {
    paddingHorizontal: 10,
    fontSize: 28,
    color: "#eee",
  },
});

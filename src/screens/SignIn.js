import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { signIn } from "../reducers/user";
import { firebase } from "../utils/Firebase";

const SigInScreen = ({ signIn }) => {
  useEffect(() => {
    const signing = () => {
      firebase
        .auth()
        .signInAnonymously()
        .then((result) => {
          console.log("signInAnonymously");
          signIn(result.user.uid);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    };

    return signing();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loading} size={50} color='#fff' />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (userUid) => dispatch(signIn(userUid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#343a40",
  },
  loading: {
    width: 100,
    height: 100,
    // backgroundColor: "#ff0000",
    // borderRadius: 10,
  },
});

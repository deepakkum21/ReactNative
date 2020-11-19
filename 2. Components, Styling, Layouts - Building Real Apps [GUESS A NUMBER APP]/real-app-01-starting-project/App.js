import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";

const App = () => {
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

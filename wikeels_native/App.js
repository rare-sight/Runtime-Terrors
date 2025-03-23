import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WikeelsReels from "./components/WikeelsReels"; // Adjust the path as needed

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WikeelsReels />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default App;
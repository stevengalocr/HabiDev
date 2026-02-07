import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../src/theme/Colors";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.text}>Welcome to the HabiDev explorer.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 10,
  },
  text: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
});

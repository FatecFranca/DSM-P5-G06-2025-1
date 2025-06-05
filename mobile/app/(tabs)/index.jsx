import { StyleSheet, Text, View, ScrollView } from "react-native";
import { api } from "../../tools/api";
import React from "react";

export default function HomeScreen() {
  const [loading, setLoading] = React.useState(true);
  const [artists, setArtists] = React.useState([]);

  const getArtists = async () => {
    setLoading(true);
    await api
      .get("/artists", {
        params: {
          limit: 50,
          offset: 0,
        },
      })
      .then((response) => {
        setArtists(response.data.rows);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getArtists();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo!</Text>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={{
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {artists.map((artist, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.subtitle}>#{index + 1}</Text>
            <Text style={{ color: "#333533", fontWeight: "bold" }}>
              {artist.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333533",
    padding: 10,
  },
  header: {
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8d99ae",
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8d99ae",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    position: "absolute",
    top: 10,
    left: 10,
    color: "#f5cb5c",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    zIndex: 1,
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: "#8d99ae",
    width: "48%",
    paddingBlock: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

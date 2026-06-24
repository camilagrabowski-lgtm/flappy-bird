import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MovingBackground from "@/components/MovingBackground";

export default function Home() {
  return (
    <ImageBackground
      source={require("../assets/images/background.png.avif")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>
          <Text style={styles.title}>FLAPPY{"\n"}</Text>
          <Text style={styles.title}>BIRD{"\n"}</Text>
        </Text>

        <Link href="/play" asChild>
          <TouchableOpacity style={styles.button}>
            <LinearGradient
              colors={["#FF8A00", "#FFD600"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Jogar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
        <Image
          source={require("../assets/images/bird.webp")}
          style={styles.bird}
        />

      </SafeAreaView>
      <MovingBackground />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  button: {
    position: "absolute",
    top: "50%",
    borderRadius: 100,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  buttonGradient: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textShadowColor: "black",
    fontFamily: "LilitaOne",
  },

  title: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 100,
    fontWeight: "900",
    lineHeight: 100,
  },
  bird: {
    width: 70,
    height: 48,
    position: "absolute",
    top: "35%",
    left: "35%",
    transform: [{ rotate: "-20deg" }],
  },
});
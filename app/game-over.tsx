import BackgroundSound from "@/components/BackgroundSound";
import GradientText from "@/components/GradientText";
import { useGame } from "@/hooks/games";
import { Link } from "expo-router";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameOver() {
  const { score } = useGame();
  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <BackgroundSound
        source={require("@/assets/audios/background.mp3.mp3")}
      />

      <SafeAreaView style={styles.screen}>
        <GradientText
          colors={["#FF8A00", "#FFD600"]}
          style={styles.title}
          start={[0, 0]}
          end={[1, 1]}
        >
          Game Over
        </GradientText>

        <View style={styles.score}>

          <Text style={styles.scoreText}>{score}</Text>

          <Image source={require("@/assets/images/coin.gif")}
            style={styles.scoreImage} />
        </View>

        <Image
          source={require("@/assets/images/bird.gif")}
          style={styles.bird}
        />

        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Voltar ao Menu</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  screen: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    marginTop: 30,
    fontSize: 55,
    fontFamily: "LuckiestGuy",
    textShadowColor: "rgba(128, 110, 110, 0.5)",
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 1,
  },

  button: {
    position: "absolute",
    top: "45%",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#000000",
    fontSize: 55,
    fontFamily: "LuckiestGuy",
    textShadowColor: "#8d8383",
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 5,
  },

  bird: {
    width: 120,
    height: 150,
    position: "absolute",
    top: "34%",
    left: "32%",
    transform: [{ rotate: "-20deg" }],
  },
  score: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  scoreImage: {
    height: 30,
    width: 30,
  },
  scoreText: {
    fontSize: 40,
    fontFamily: "luckiestGuy",
    textShadowColor: "black",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,
    color: "white",
  },
});
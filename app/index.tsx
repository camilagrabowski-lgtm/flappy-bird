import BackgroundSound from "@/components/BackgroundSound";
import GradientText from "@/components/GradientText";
import { useGame } from "@/hooks/games";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { router } from "expo-router";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { reset, highscore} = useGame();
  const { coins } = useGame();

  return (
    <ImageBackground
  source={require("../assets/images/background.png.1.jpg")}
  resizeMode="cover"
  style={styles.background}
>
  <BackgroundSound
    source={require("../assets/audios/background.mp3.mp3")}
  />

  <SafeAreaView style={styles.menu}>
  <View style={styles.header}>
    <Image
      source={require("../assets/images/bird.gif")}
      style={styles.bmo}
    />

    <GradientText
      colors={["#fcfbf9", "#f8f8f6"]}
      style={styles.title}
      start={[0, 0]}
      end={[1, 1]}
    >
      FLYING BMO
    </GradientText>

    <Text style={styles.highscore}>
      Melhor pontuação: {highscore}
    </Text>
  </View>

  <View style={styles.buttonsContainer}>
  <TouchableOpacity
    style={styles.menuButton}
    onPress={() => {
      reset();
      router.push("/play");
    }}
  >
    <Text style={styles.menuButtonText}>▶ PLAY</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.menuButton}
    onPress={() => router.push("/skins")}
  >
    <Text style={styles.menuButtonText}>🎮 PERSONAGENS</Text>
  </TouchableOpacity>
</View>

</SafeAreaView>

</ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
menu: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
},
buttonsContainer: {
  marginTop: 80,
  alignItems: "center",
},

title: {
  fontSize: 78,
  fontFamily: "LuckiestGuy",
  color: "#1b1b1b",

  letterSpacing: 3,

  textAlign: "center",

  textShadowColor: "#9b9999",
  textShadowOffset: {
    width: 4,
    height: 4,
  },
  textShadowRadius: 6,
},

menuButtonText: {
  fontSize: 38,
  fontFamily: "LuckiestGuy",
  color: "#000",

  letterSpacing: 2,

  textShadowColor: "#FFF",
  textShadowOffset: {
    width: 2,
    height: 2,
  },
  textShadowRadius: 2,
},
  buttonGradient: {
  paddingVertical: 18,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 25,
},
menuButton: {
  width: 360,
  height: 85,
  backgroundColor: "rgba(255,255,255,0.88)",

  borderWidth: 4,
  borderColor: "#000",

  borderRadius: 25,

  justifyContent: "center",
  alignItems: "center",

  marginVertical: 12,

  shadowColor: "#000",
  shadowOpacity: 0.35,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 6,
  },
  elevation: 10,
},

  highscore: {
  marginTop: 18,

  fontSize: 28,
  fontFamily: "LilitaOne",

  color: "#f8f3f3",

  backgroundColor: "rgba(255,255,255,0.25)",

  paddingHorizontal: 20,
  paddingVertical: 10,

  borderRadius: 30,

  overflow: "hidden",

  textShadowColor: "#000",
  textShadowOffset: {
    width: 2,
    height: 2,
  },
  textShadowRadius: 3,
},
 header: {
  alignItems: "center",
  justifyContent: "center",
  marginTop: -80,
  width: "100%",
  position: "relative",
},


bmo: {
  position: "absolute",
  left: 100,
  width: 140,
  height: 150,
}
});
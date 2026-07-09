import BackgroundSound from "@/components/BackgroundSound";
import GradientText from "@/components/GradientText";
import { LinearGradient } from "expo-linear-gradient";
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

export default function Home() {
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
    <View style={styles.menu}>
      <GradientText
        colors={["#FF8A00", "#FFD600"]}
        style={styles.title}
        start={[0, 0]}
        end={[1, 1]}
      >
        FLYING BMO
      </GradientText>

      <Link href="/play" asChild>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </Link>
    </View>

    <Image
      source={require("../assets/images/bird.gif")}
      style={styles.bird}
    />
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
  position: "absolute",
  top: "25%",
  left: 0,
  right: 0,
  alignItems: "center",
  justifyContent: "center",
},

title: {
  fontSize: 55,
  fontFamily: "LuckiestGuy",
  marginBottom: 55, // distância entre o título e o Play
  marginTop: 35,
  textShadowColor: "rgba(0,0,0,0.5)",
  textShadowOffset: {
    width: 3,
    height: 3,
  },
  textShadowRadius: 1,
},

buttonText: {
  color: "#000",
  fontSize: 70,
  fontFamily: "LilitaOne",
  textShadowColor: "rgba(0,0,0,0.5)",
  textShadowOffset: {
    width: 3,
    height: 3,
  },
  textShadowRadius: 5,
},
  buttonGradient: {
    paddingHorizontal: 65,
    paddingVertical: 30,
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  button: {
  justifyContent: "center",
  alignItems: "center",
},
  bird: {
    width: 120,
    height: 150,
    position: "absolute",
    top: "35%",
    left: "35%",
    transform: [{ rotate: "-20deg" }],
  },
});
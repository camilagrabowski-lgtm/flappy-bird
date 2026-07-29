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

    <View>
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
  </View>

  <View style={styles.buttons}>
    <TouchableOpacity onPress={() => router.push("/play")}>
      <Text style={styles.buttonsText}>PLAY</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push("/skins")}>
      <Text style={styles.buttonsText}>PERSONAGENS</Text>
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


title: {
  fontSize: 75,
  fontFamily: "LuckiestGuy",
  color: "white",
  textShadowColor: "rgba(10, 10, 10, 0.5)",
  textShadowOffset: {
    width: 3,
    height: 3,
  },
  textShadowRadius: 1,
  paddingRight: 3,
},

buttonsText: {
  color: "#fdfbfb",
  fontSize: 50,
  fontFamily: "LilitaOne",
  textShadowColor: "rgba(8, 8, 8, 0.5)",
  textShadowOffset: {
    width: 3,
    height: 3,
  },
  textShadowRadius: 5,
},
  buttonsGradient: {
    color: "white",
    paddingHorizontal: 65,
    paddingVertical: 30,
    width: "100%",
    height: "100%",
    borderRadius: 100,
    
  },
 buttons: {
  marginTop: 90, // distância entre o título e os botões
  alignItems: "center",
  justifyContent: "center",
  borderColor: "white"
},

  highscore: {
  color: "white",
  fontSize: 25,
  textAlign: "center",
  marginTop: 20,
},
  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: -80, // sobe um pouco o título
},


bmo: {
  width: 140,
  height: 140,
  marginRight: 20,
},
});
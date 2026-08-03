import { useGame } from "@/hooks/games";
import { BIRD } from "@/constants/bird";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { StyleSheet } from "react-native";

const imagens = {
  1: require("@/assets/images/bird.gif"),
  2: require("@/assets/images/jake.png"),
  3: require("@/assets/images/finn.png"),
  4: require("@/assets/images/marceline.png"),
  5: require("@/assets/images/princesa-jujuba.png"),
};

export default function Bird() {
  const { birdY, skinSelecionada } = useGame();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: birdY.value }],
  }));

  return (
    <Animated.Image
      source={imagens[skinSelecionada as keyof typeof imagens]}
      style={[styles.bird, animatedStyle]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  bird: {
    position: "absolute",
    left: BIRD.x,
    width: 60,
    height: 60,
  },
});
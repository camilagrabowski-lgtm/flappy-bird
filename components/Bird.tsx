import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { skins } from "@/constants/skin";
import { BIRD } from "@/constants/bird";
import { useGame } from "@/hooks/games";

export default function Bird() {
  const { birdY, skinSelecionada } = useGame();

  // Procura a skin selecionada
  const skin =
    skins.find((item) => item.id === Number(skinSelecionada)) ||
    skins[0];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: birdY.value,
        },
      ],
    };
  });

  return (
    <Animated.Image
      source={skin.imagem}
      resizeMode="contain"
      style={[
        styles.image,
        animatedStyle,
        {
          width: skin.size,
          height: skin.size,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    left: BIRD.x,
  },
});
import GameOver from "@/app/game-over";
import {
  BIRD_ASPECT_RATIO,
  BIRD_HEIGHT,
  BIRD_X,
} from "@/constants/bird";
import { GROUND_HEIGHT } from "@/constants/ground";
import { GRAVITY } from "@/constants/animation";
import { useGame } from "@/hooks/games";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";

export default function Bird() {
  const { height } = Dimensions.get("window");
  const { birdY, velocity } = useGame();

  const frame = useFrameCallback((frameInfo) => {
    "worklet";

    const t = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;

    velocity.value += GRAVITY * t;
    birdY.value += velocity.value * t;

    if (birdY.value > height - BIRD.height + BIRD.hitbox.bottom - GROUND_HEIGHT) {
      runOnJS(GameOver)();
    }

    if (birdY.value < 0) {
      birdY.value = 0;
      velocity.value = 0;
    }
  });

  useEffect(() => {
    frame.setActive(true);

    return () => frame.setActive(false);
  }, [frame]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: birdY.value },
      {
        rotate: `${(velocity.value / 1000) * 90}deg`,
      },
    ],
  }));

  return (
    <Animated.Image
      source={require("@/assets/images/bird.gif")}
      style={[styles.bird, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  bird: {
    width: BIRD_HEIGHT * BIRD_ASPECT_RATIO,
    height: BIRD_HEIGHT,
    position: "absolute",
    top: 0,
    left: BIRD_X,
  },
});
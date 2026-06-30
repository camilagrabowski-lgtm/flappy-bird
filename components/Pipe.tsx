import { DURATION } from "@/constants/animation";
import { CAP_HEIGHT, GAP_SIZE, PIPE_WIDTH } from "@/constants/pipe";
import { useEffect } from "react";
import { Dimensions, Easing, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

interface Props {
  gapY: number;
  onEnd: () => void;
}

export default function Pipe({ gapY, onEnd }: Props) {
  const { height, width } = Dimensions.get("window");

  const topHeight = gapY - GAP_SIZE / 2;
  const bottomY = gapY + GAP_SIZE / 2;
  const bottomHeight = height - bottomY;

  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(width, {
      duration: DURATION,
      easing: Easing.linear,
    },
    () => runOnJS(onEnd)(),
  );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: -translateX.value,
      },
    ],
  }));

  return (
    <>
      {/* Cano Superior */}
      <Animated.View
        style={[
          styles.pipe,
          {
            left: width,
            top: 0,
            height: topHeight,
          },
          animatedStyle,
        ]}
      />

      {/* Tampa Superior */}
      <Animated.View
        style={[
          styles.cap,
          {
            left: width - 5,
            top: topHeight - CAP_HEIGHT,
          },
          animatedStyle,
        ]}
      />

      {/* Cano Inferior */}
      <Animated.View
        style={[
          styles.pipe,
          {
            left: width,
            top: bottomY,
            height: bottomHeight,
          },
          animatedStyle,
        ]}
      />

      {/* Tampa Inferior */}
      <Animated.View
        style={[
          styles.cap,
          {
            left: width - 5,
            top: bottomY,
          },
          animatedStyle,
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pipe: {
    position: "absolute",
    width: PIPE_WIDTH,
    backgroundColor: "#2ecc71",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: "#1b5e20",
  },

  cap: {
    position: "absolute",
    width: PIPE_WIDTH + 10,
    height: CAP_HEIGHT,
    backgroundColor: "#2ecc71",
    borderWidth: 4,
    borderColor: "#1b5e20", 
  },
});
import { useEffect } from "react";
import { Stack, ErrorBoundary } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import "react-native-reanimated";

import { LilitaOne_400Regular } from "@expo-google-fonts/lilita-one";
import { LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";

export { ErrorBoundary };

export const unstable_settings = {
  initialRouteName: "index",
};

// Impede que a Splash Screen desapareça automaticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    LilitaOne: LilitaOne_400Regular,
    LuckiestGuy: LuckiestGuy_400Regular,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="play" />
    </Stack>
  );
}
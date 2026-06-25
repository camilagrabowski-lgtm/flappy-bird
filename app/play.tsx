import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet, Image, Pressable, }
    from "react-native";
import MovingBackground from "@/components/MovingBackground";
import { useAudioPlayer} from "expo-audio";
import { useEffect } from "react";

export default function Play() {
     const jumpSound = useAudioPlayer(
     require("../assets/audios/wing.mp3"));

    function handleJump() {
        jumpSound.seekTo(0);
        jumpSound.play();
    }
    useEffect(() => {
      jumpSound.seekTo(0);
      jumpSound.loop = true;
      jumpSound.play();

      return () => {
        jumpSound.pause();
      }

    }, []);

    return (
        <ImageBackground
            source={require("../assets/images/background.png.avif")}
            resizeMode="cover"
            style={styles.background}
        >
            <Pressable onPress={handleJump} style={styles.background}>
                <SafeAreaView style={styles.screen}>
                    <Image
                        source={require("../assets/images/brind.gif")}
                        style={styles.bird}
                    />
                </SafeAreaView>
            </Pressable>

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
    bird: {
        width: 70,
        height: 48,
        position: "absolute",
        top: "55%",
        left: 100,
    },
});
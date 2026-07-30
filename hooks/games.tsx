import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dimensions } from "react-native";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GameContextProps {
  birdY: SharedValue<number>;
  velocity: SharedValue<number>;

  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;

  reset: () => void;

  highscore: number;

  gameOver: () => void;

  coins: number;
  addCoin: () => Promise<void>;
  spendCoins: (value: number) => Promise<void>;

  skinSelecionada: number;
  setSkinSelecionada: React.Dispatch<React.SetStateAction<number>>;
}

const GameContext = createContext({} as GameContextProps);

export function GameProvider({ children }: { children: ReactNode }) {
  const { height } = Dimensions.get("window");

  const birdY = useSharedValue(height / 2);
  const velocity = useSharedValue(0);

  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [coins, setCoins] = useState(0);

  // Skin equipada
  const [skinSelecionada, setSkinSelecionada] = useState(1);

  const hitAudio = useAudioPlayer(
    require("@/assets/audios/hit.mp3")
  );

  function reset() {
    setScore(0);
    birdY.value = height / 2;
    velocity.value = 0;
  }

  async function addCoin() {
    const total = coins + 1;

    setCoins(total);

    await AsyncStorage.setItem(
      "coins",
      total.toString()
    );
  }

  async function spendCoins(value: number) {
    const total = coins - value;

    if (total < 0) return;

    setCoins(total);

    await AsyncStorage.setItem(
      "coins",
      total.toString()
    );
  }

  async function gameOver() {
    router.replace("/game-over");

    try {
      hitAudio.seekTo(0);
      hitAudio.play();
    } catch {}

    if (score > highscore) {
      setHighscore(score);

      await AsyncStorage.setItem(
        "highscore",
        score.toString()
      );
    }
  }

  useEffect(() => {
  async function loadData() {
    const high = await AsyncStorage.getItem("highscore");
    const savedCoins = await AsyncStorage.getItem("coins");
    const skin = await AsyncStorage.getItem("skinSelecionada");

    setHighscore(Number(high) || 0);
    setCoins(Number(savedCoins) || 0);

    if (skin) {
      setSkinSelecionada(Number(skin));
    }
  }

  loadData();
}, []);

  return (
    <GameContext.Provider
  value={{
    birdY,
    velocity,

    score,
    setScore,

    reset,

    highscore,

    gameOver,

    coins,
    addCoin,
    spendCoins,

    skinSelecionada,
    setSkinSelecionada,
  }}
>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);

export default GameContext;